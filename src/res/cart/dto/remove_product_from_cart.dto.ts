import { IsNotEmpty, IsString } from 'class-validator';

export class RemoveProductFromCartDto {
  @IsString()
  @IsNotEmpty()
  product_id: string;
}
