import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { CategoryEntity } from '../category/entities/category.entity';
import { ImageEntity } from './entity/image.entity';
import { BrandEntity } from '../brand/entities/brand.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      ImageEntity,
      BrandEntity,
      CategoryEntity,
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
