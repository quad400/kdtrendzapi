import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from 'src/lib/common/guard/auth.guard';
import { User } from 'src/lib/common/decorators/user.decorator';
import { Response } from 'src/lib/common/utility/response';
import { PageOptionsDto } from 'src/lib/common/dto/pagination.dto';
import { OrderStatus } from './entity/order.entity';
import { UpdateOrderStatusDto } from './dto/update_order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createOrder(@User() userId: string) {
    return Response.success(await this.orderService.createOrder(userId));
  }

  @Get('list')
  @UseGuards(AuthGuard)
  async getOrders(@User() userId: string, @Query() query: PageOptionsDto) {
    return Response.success(await this.orderService.getOrders(userId, query));
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getOrder(@Param('id') id: string) {
    return Response.success(await this.orderService.getOrder(id));
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async updateOrderStatus(
    @Body() status: UpdateOrderStatusDto,
    @Param('id') id: string,
  ) {
    return Response.success(
      await this.orderService.updateOrderStatus(status, id),
    );
  }
}
