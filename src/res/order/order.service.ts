import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItemEntity } from './entity/order_item.entity';
import { Repository } from 'typeorm';
import { OrderEntity, OrderStatus } from './entity/order.entity';
import { CartEntity } from '../cart/entity/cart.entity';
import {
  PageDto,
  PageMetaDto,
  PageOptionsDto,
} from 'src/lib/common/dto/pagination.dto';
import { UpdateOrderStatusDto } from './dto/update_order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderItemEntity)
    private orderItemRepository: Repository<OrderItemEntity>,
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
  ) {}

  async createOrder(userId: string) {
    const cart = await this.cartRepository.findOne({
      where: { user_id: userId },
      relations: ['items', 'items.product'],
    });

    if (!cart) {
      throw new NotFoundException('Cart is either empty or not found');
    }

    const order = this.orderRepository.create({
      user_id: cart.user_id,
      total_price: cart.total_price,
      status: OrderStatus.PENDING,
      items: [],
    });

    for (const cartItem of cart.items) {
      const orderItem = this.orderItemRepository.create({
        order_id: order.id,
        product: cartItem.product,
        quantity: cartItem.quantity,
        price: cartItem.product.price * cartItem.quantity,
      });

      order.items.push(orderItem);
    }

    const newOrder = await this.orderRepository.save(order);
    await this.cartRepository.remove(cart);
    return newOrder;
  }

  async getOrders(userId: string, query: PageOptionsDto) {
    const { limit, page, search, status, order } = query;

    const skip = (page - 1) * limit;

    const queryBuilder = this.orderRepository
      .createQueryBuilder('order')
      .where('order.user_id = :userId', { userId });

    // console.log(await queryBuilder.getMany())
    if (status) {
      queryBuilder.andWhere('order.status = :status', { status });
    }

    queryBuilder.orderBy('order.updated_at', order).skip(skip).take(limit);

    const itemCount = await queryBuilder.getCount();
    const orders = await queryBuilder.getMany();

    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto: query,
    });

    return new PageDto(orders, pageMetaDto);
  }

  async updateOrderStatus(data: UpdateOrderStatusDto, id: string) {
    const order = await this.orderRepository.findOne({
      where: { id},
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    order.status = data.status as OrderStatus;;
    return this.orderRepository.save(order);
  }
}
