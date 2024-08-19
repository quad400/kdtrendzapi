import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from './entities/payment.entity';
import { BrandEntity } from '../brand/entities/brand.entity';
import { OrderEntity } from '../order/entity/order.entity';
import { ConfigService } from '@nestjs/config';
import { PayoutEntity } from './entities/payout.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PaymentEntity,
      BrandEntity,
      OrderEntity,
      PayoutEntity,
    ]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService, ConfigService],
})
export class PaymentModule {}
