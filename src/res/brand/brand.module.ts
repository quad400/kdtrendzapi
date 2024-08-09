import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from './entities/brand.entity';
import { UserEntity } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([BrandEntity, UserEntity])],
  controllers: [BrandController],
  providers: [BrandService, UserService],
})
export class BrandModule {}
