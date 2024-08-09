import { Module } from '@nestjs/common';
import { ColorService } from './color.service';
import { ColorController } from './color.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColorEntity } from './entities/color.entity';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ColorEntity, UserEntity])],
  controllers: [ColorController],
  providers: [ColorService, UserService],
})
export class ColorModule {}
