import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { Repository } from 'typeorm';
import {
  FogotPasswordDto,
  LoginAccountDto,
  RegisterAccountDto,
  VerifyAccountDto,
} from './dto/authentication.dto';
import { hash, genSalt, compare } from 'bcrypt';
import { Response } from 'src/lib/common/utility/response';
import { generateCode } from 'src/lib/common/utility';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async createUser(data: RegisterAccountDto) {
    const isExist = await this.userService.findByEmail(data.email);

    if (isExist) {
      return Response.error(
        'User with email already exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    const salt = await genSalt(10);

    data.password = await hash(data.password, salt);
    const user = this.userRepository.create(data);

    const userSaved = await generateCode(user);
    return Response.success(
      userSaved,
      'Successfull created user',
      HttpStatus.CREATED,
    );
  }

  async login(data: LoginAccountDto) {
    const user = await this.findByIdWithPassword(data.email);

    const isMatch = await compare(data.password, user.password);

    if (!isMatch) {
      return Response.error('Invalid Credentials', HttpStatus.BAD_REQUEST);
    }

    delete user.password;
    const payload = { sub: user.id, email: user.email };

    const response = {
      user,
      access_token: await this.jwtService.signAsync(payload),
    };

    return Response.success(response, 'Login Successfully');
  }

  async forgotPassword(data: FogotPasswordDto) {
    const user = await this.userService.findByEmail(data.email);
    if (!user) {
      return Response.error('User not found', HttpStatus.NOT_FOUND);
    }

    const userUpdated = await generateCode(user);

    return Response.success(
      userUpdated,
      'Verification code has been sent to your email',
      HttpStatus.OK,
    );
  }

  async resetPassword(data: any, payload: UserEntity) {
    const user = await this.findByIdWithPassword(payload.email);

    if (data.password !== data.confirmPassword) {
      return Response.error('Password do not match', HttpStatus.BAD_REQUEST);
    }

    const salt = await genSalt(10);
    user.password = await hash(data.password, salt);

    await this.userRepository.save(user);

    delete user.password;
    return Response.success(user, 'Password reset successfully', HttpStatus.OK);
  }

  async verifyAccount(data: VerifyAccountDto) {
    const user = await this.userService.findByEmail(data.email);

    if (
      user.verification_code !== data.verification_code ||
      user.verification_code_expires < new Date()
    ) {
      return Response.error(
        'Invalid code or Code has Expire',
        HttpStatus.BAD_REQUEST,
      );
    }

    user.verification_code = null;
    user.verification_code_expires = null;
    user.is_verified = true;

    await this.userRepository.save(user);

    const payload = { sub: user.id, email: user.email };

    const response = {
      user,
      access_token: await this.jwtService.signAsync(payload),
    };

    return Response.success(
      response,
      'Account verified successfully',
      HttpStatus.OK,
    );
  }

  async findByIdWithPassword(email: string): Promise<UserEntity> {
    const user = await this.userRepository
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email=:email', { email: email })
      .getOne();

    if (!user) throw new BadRequestException('User not found');
    return user;
  }
}
