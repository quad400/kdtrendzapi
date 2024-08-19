import { IsString } from 'class-validator';

export class VerifyAccountNumberDto {
  @IsString()
  bank_code: string;

  @IsString()
  account_number: string;
}
