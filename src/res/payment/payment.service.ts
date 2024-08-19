import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { BrandEntity } from '../brand/entities/brand.entity';
import { CreatePaymentDto } from './dto/payment.dto';
import { OrderEntity, OrderStatus } from '../order/entity/order.entity';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { VerifyAccountNumberDto } from './dto/account.dto';
import {
  PageDto,
  PageMetaDto,
  PageOptionsDto,
} from 'src/lib/common/dto/pagination.dto';
import { Request } from 'express';
import * as crypto from 'crypto';
import { PayoutEntity } from './entities/payout.entity';

@Injectable()
export class PaymentService {
  private readonly paystackSecret: string;
  private readonly paystackBaseUrl: string;

  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,

    @InjectRepository(PayoutEntity)
    private readonly payoutRepository: Repository<PayoutEntity>,

    @InjectRepository(BrandEntity)
    private readonly brandRepository: Repository<BrandEntity>,

    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,

    private readonly configService: ConfigService,
  ) {
    this.paystackSecret = this.configService.get<string>('PAYSTACK_SECRET_KEY');
    this.paystackBaseUrl = this.configService.get<string>('PAYSTACK_BASEURL');
  }

  async createPayment(data: CreatePaymentDto) {
    const { brandId, orderId } = data;

    const brand = await this.findBrandById(brandId);

    const order = await this.orderRepository.findOneBy({
      id: orderId,
      status: OrderStatus.PENDING,
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const commission_fee = order.total_price * 0.05;
    const balance = order.total_price - commission_fee;

    let response: any;

    try {
      response = await axios.post(
        `${this.paystackBaseUrl}/transaction/initialize`,
        {
          email: brand.user.email,
          amount: order.total_price * 100,
        },
        {
          headers: {
            Authorization: `Bearer ${this.paystackSecret}`,
          },
        },
      );
    } catch (error) {
      throw new BadRequestException(error.response.data);
    }

    if (response.status !== 200) {
      throw new BadRequestException('Failed to initialize payment');
    }

    const payment = this.paymentRepository.create({
      brand,
      amount: balance,
      commission_fee,
      status: 'PENDING',
      total_amount: order.total_price,
      payment_refrence: response.data.data.reference,
    });

    await this.paymentRepository.save(payment);

    Object.assign(order, { status: OrderStatus.PROCESSING });
    await this.orderRepository.save(order);
  }

  async getBanks() {
    try {
      const { data } = await axios.get(`${this.paystackBaseUrl}/bank`, {
        headers: {
          Authorization: `Bearer ${this.paystackSecret}`,
        },
      });
      return data.data;
    } catch (error) {
      throw new BadRequestException(error.response.data);
    }
  }

  async getPayments(brandId: string, query: PageOptionsDto) {
    const { limit, page, status, order } = query;


    const skip = (page - 1) * limit;

    const queryBuilder = this.paymentRepository
      .createQueryBuilder('payment')
      .where('payment.brand_id = :brand_id', { brand_id: brandId });

    if (status) {
      queryBuilder.andWhere('payment.status = :status', { status });
    }

    queryBuilder.orderBy('payment.updated_at', order).skip(skip).take(limit);

    const itemCount = await queryBuilder.getCount();
    const payments = await queryBuilder.getMany();

    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto: query,
    });

    return new PageDto(payments, pageMetaDto);
  }

  async verifyAccountNumber(query: VerifyAccountNumberDto) {
    const { account_number, bank_code } = query;
    try {
      console.log(query);
      const { data } = await axios.get(
        `${this.paystackBaseUrl}/bank/resolve?account_number=${account_number}&bank_code=${bank_code}`,
        {
          headers: {
            Authorization: `Bearer ${this.paystackSecret}`,
          },
        },
      );
      return data.data;
    } catch (error) {
      throw new BadRequestException(error.response.data);
    }
  }

  async generateAccountId(brandId: string) {
    const brand = await this.findBrandById(brandId);

    try {
      const { data } = await axios.post(
        `${this.paystackBaseUrl}/transferrecipient`,
        {
          type: 'nuban',
          name: brand.account_name,
          account_number: brand.account_number,
          bank_code: brand.bank_code,
          currency: 'NGN',
        },
        {
          headers: {
            Authorization: `Bearer ${this.paystackSecret}`,
          },
        },
      );

      Object.assign(brand, { paystack_account_id: data.data.recipient_code });
      await this.brandRepository.save(brand);

      return brand;
    } catch (error) {
      console.log(error.response.data);
      throw new BadRequestException(error.response.data);
    }
  }

  async handlePaystackWebhook(req: Request) {
    const hash = crypto
      .createHmac('sha512', this.paystackSecret)
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (hash === req.headers['x-paystack-signature']) {
      const event = req.body;

      if (event.event === 'charge.success') {
        const payment = await this.paymentRepository.findOneBy({
          payment_refrence: event.data.reference,
        });

        Object.assign(payment, { status: 'COMPLETED' });

        await this.paymentRepository.save(payment);
      } else {
        const payment = await this.paymentRepository.findOneBy({
          payment_refrence: event.data.reference,
        });

        Object.assign(payment, { status: 'FAILED' });

        await this.paymentRepository.save(payment);
      }
    }
  }

  async processPayout(brandId: string) {
    const brand = await this.findBrandById(brandId);

    const payments = await this.paymentRepository.findBy({
      brand_id: brandId,
      status: 'COMPLETED',
    });

    let cashout = 0;

    for (const payment of payments) {
      cashout += payment.amount;

      Object.assign(payment, { status: 'CASHOUT' });
      await this.paymentRepository.save(payment);
    }

    if (!brand.paystack_account_id) {
      await this.generateAccountId(brandId);
    }

    const transfer = await this.initiateTransfer(
      cashout,
      brand.paystack_account_id,
    );

    const payout = this.payoutRepository.create({
      brand: brand,
      amount: cashout,
      status: 'COMPLETED',
      transaction_id: transfer.data.reference,
    });

    await this.payoutRepository.save(payout);

    return payout;
  }

  async initiateTransfer(amount: number, recipient_code: string) {
    try {
      const response = await axios.post(
        `${this.paystackBaseUrl}/transfer`,
        {
          source: 'balance',
          amount: amount * 100,
          recipient: recipient_code,
          reason: 'Cashout for my brand',
        },
        {
          headers: {
            Authorization: `Bearer ${this.paystackSecret}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      throw new BadRequestException(error.response.data);
    }
  }

  async findBrandById(brandId: string) {
    const brand = await this.brandRepository.findOne({
      where: { id: brandId },
      relations: ['user'],
    });
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }
    return brand;
  }
}
