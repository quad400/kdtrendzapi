import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { UserEntity } from '../user/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
