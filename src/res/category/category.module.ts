import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity, UserEntity])],
  controllers: [CategoryController],
  providers: [CategoryService, UserService],
})
export class CategoryModule {}
