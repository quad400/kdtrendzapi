import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../product/entity/product.entity';
import { CartItemEntity } from './entity/cart_item.entity';
import { CartEntity } from './entity/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, CartItemEntity, CartEntity])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
