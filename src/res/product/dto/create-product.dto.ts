import {
  IsArray,
  IsNumber,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsOptional()
  previous_price: number;

  @IsInt()
  stock: number;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsArray()
  @IsOptional()
  images: [];

  @IsArray()
  @IsOptional()
  sizes: [];

  @IsArray()
  @IsOptional()
  colors: [];
}
