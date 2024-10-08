import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Order } from '../enum/order.enum';
import { Type } from 'class-transformer';
import { OrderStatus } from 'src/res/order/entity/order.entity';

export class PageMetaDto {
  @IsInt()
  page?: number;

  @IsInt()
  limit?: number;

  @IsInt()
  itemCount: number;

  @IsInt()
  pageCount: number;

  @IsBoolean()
  hasPreviousPage: boolean;

  @IsBoolean()
  hasNextPage: boolean;

  constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters) {
    this.page = pageOptionsDto.page;
    this.limit = pageOptionsDto.limit;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.limit);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}



export class PageOptionsDto {
  @IsEnum(Order)
  @IsOptional()
  order?: Order = Order.ASC;

  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number) // Ensures the transformation of string to number
  page?: number = 1;

  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number) // Ensures the transformation of string to number
  limit?: number = 10;

  @IsString()
  @IsOptional()
  search?: string
  
  @IsString()
  @IsOptional()
  category?: string;
  
  @IsString()
  @IsOptional()
  size?: string;
  
  @IsString()
  @IsOptional()
  color?: string;
  
  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;

}

export interface PageMetaDtoParameters {
  pageOptionsDto: PageOptionsDto;
  itemCount: number;
}

export class PageDto<T> {
  @IsArray()
  results: T[];

  meta: PageMetaDto;

  constructor(results: T[], meta: PageMetaDto) {
    this.meta = meta;
    this.results = results;
  }
}
