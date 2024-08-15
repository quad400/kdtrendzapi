import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductEntity } from '../product/entity/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItemEntity } from './entity/cart_item.entity';
import { AddProductToCartDto } from './dto/add_product_to_cart.dto';
import { CartEntity } from './entity/cart.entity';
import { parse } from 'path';
import { RemoveProductFromCartDto } from './dto/remove_product_from_cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    @InjectRepository(CartItemEntity)
    private cartItemRepository: Repository<CartItemEntity>,
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
  ) {}

  async addProductToCart(userId: string, data: AddProductToCartDto) {
    const { product_id, quantity, size, color } = data;
    const product = await this.productRepository.findOne({
      where: { id: product_id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const price = parseFloat(product.price.toString());

    let cart = await this.findCartByUserId(userId);

    if (!cart) {
      cart = this.cartRepository.create({ user: { id: userId }, items: [] });
      cart = await this.cartRepository.save(cart);
    }

    let cartItem = cart.items.find(
      (item) =>
        item.product.id === product_id &&
        item.size === size &&
        item.color === color,
    );

    if (cartItem) {
      cartItem.quantity = quantity;
      cartItem.price = price * cartItem.quantity;
    } else {
      cartItem = this.cartItemRepository.create({
        cart,
        product,
        quantity,
        size,
        color,
        price: price * quantity,
      });
      cart.items.push(cartItem);
    }

    let total_price = 0;
    for (let i = 0; i < cart.items.length; i++) {
      total_price += cart.items[i].price;
    }
    cart.total_price = total_price;

    await this.cartRepository.save(cart);

    return cart;
  }
  async removeProductFromCart(userId: string, id: string) {
    let cart = await this.findCartByUserId(userId);
    const cartItemToRemove = await this.cartItemRepository.findOne({
      where: { id: id },
    });

    if (!cartItemToRemove) {
      throw new NotFoundException('Product not in cart');
    }

    cart.items = cart.items.filter((item) => item.id !== cartItemToRemove.id);

    cart.total_price = cart.items.reduce((acc, item) => acc + item.price, 0);

    await this.cartRepository.save(cart);
  }

  async findCartByUserId(userId: string) {
    const cart = await this.cartRepository.findOne({
      where: { user_id: userId },
      relations: ['items'],
    });

    return cart;
  }

  async getCart(userId: string) {
    const cart = await this.findCartByUserId(userId);
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return cart;
  }
}
