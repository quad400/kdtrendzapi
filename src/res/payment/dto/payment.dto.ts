import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreatePaymentDto{
    
    @IsString()
    @IsNotEmpty()
    brandId: string;

    @IsString()
    @IsNotEmpty()
    orderId: string;

}
