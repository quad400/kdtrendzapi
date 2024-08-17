import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { OrderStatus } from "../entity/order.entity";

export class UpdateOrderStatusDto {
  @IsEnum(OrderStatus)
  @IsNotEmpty()
  status: string;
}