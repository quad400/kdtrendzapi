import { Module } from '@nestjs/common';
import { SizeService } from './size.service';
import { SizeController } from './size.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SizeEntity } from './entities/size.entity';
import { UserEntity } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([SizeEntity, UserEntity])],
  controllers: [SizeController],
  providers: [SizeService, UserService],
})
export class SizeModule {}
