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
import { ProductService } from './product.service';
import { BrandGuard } from 'src/lib/common/guard/brand.guard';
import { UseBrand } from 'src/lib/common/decorators/brand.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { Response } from 'src/lib/common/utility/response';
import { PageOptionsDto } from 'src/lib/common/dto/pagination.dto';
import { UpdateProductDto } from './dto/update.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(BrandGuard)
  async createProduct(
    @UseBrand() brandId: string,
    @Body() createProductDto: CreateProductDto,
  ) {
    return Response.success(
      await this.productService.createProduct(brandId, createProductDto),
    );
  }

  @Get()
  async getProducts(@Query() query: PageOptionsDto) {
    return Response.success(await this.productService.getProducts(query));
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return Response.success(await this.productService.getProduct(id));
  }

  @Patch(':id')
  @UseGuards(BrandGuard)
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UseBrand() brandId: string,
  ) {
    return Response.success(
      await this.productService.updateProduct(id, updateProductDto, brandId),
    );
  }
}
