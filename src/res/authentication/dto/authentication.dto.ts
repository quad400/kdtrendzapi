import { PickType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class RegisterAccountDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  password: string;
}

export class LoginAccountDto extends PickType(RegisterAccountDto, [
  'email',
  'password',
]) {}

export class FogotPasswordDto extends PickType(RegisterAccountDto, ['email']) {}

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  confirm_password: string;
}

export class VerifyAccountDto extends PickType(RegisterAccountDto, ['email']) {
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  verification_code: string;
}
