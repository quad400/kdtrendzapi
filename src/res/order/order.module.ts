import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entity/order.entity';
import { OrderItemEntity } from './entity/order_item.entity';
import { CartEntity } from '../cart/entity/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, CartEntity,OrderItemEntity])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
