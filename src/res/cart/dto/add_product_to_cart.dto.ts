import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";


export class AddProductToCartDto {
    @IsString()
    @IsNotEmpty()
    product_id: string

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    quantity: number

    @IsString()
    @IsOptional()
    size?: string

    @IsString()
    @IsOptional()
    color?: string
}