import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { SizeEntity } from '../size/entities/size.entity';
import { ColorEntity } from '../color/entities/color.entity';
import { CategoryEntity } from '../category/entities/category.entity';
import { ImageEntity } from './entity/image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      SizeEntity,
      ColorEntity,
      ImageEntity,
      CategoryEntity,
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
