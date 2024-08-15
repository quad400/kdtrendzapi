import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard } from 'src/lib/common/guard/auth.guard';
import { User } from 'src/lib/common/decorators/user.decorator';
import { AddProductToCartDto } from './dto/add_product_to_cart.dto';
import { Response } from 'src/lib/common/utility/response';
import { RemoveProductFromCartDto } from './dto/remove_product_from_cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @HttpCode(200)
  @Post('add-to-cart')
  @UseGuards(AuthGuard)
  async addProductToCart(
    @User() userId: string,
    @Body() addProductToDto: AddProductToCartDto,
  ) {
    return Response.success(
      await this.cartService.addProductToCart(userId, addProductToDto),
    );
  }

  @HttpCode(200)
  @Post('remove-from-cart/:id')
  @UseGuards(AuthGuard)
  async removeProductFromCart(@User() userId: string, @Param('id') id: string) {
    await this.cartService.removeProductFromCart(userId, id)
    return Response.success( null, "Successfully remove product from cart"
    );
  }

  @Get("get-cart")
  @UseGuards(AuthGuard)
  async getCart(@User() userId: string){
    return Response.success(
      await this.cartService.getCart(userId)
    );
  }
}
