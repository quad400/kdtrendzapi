import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { AuthGuard } from 'src/lib/common/guard/auth.guard';
import { User } from 'src/lib/common/decorators/user.decorator';
import { UserEntity } from '../user/entity/user.entity';
import { Response } from 'src/lib/common/utility/response';
import { BrandGuard } from 'src/lib/common/guard/brand.guard';
import { RoleGuard } from 'src/lib/common/guard/user-roles.guard';
import { RolesEnum } from 'src/lib/common/enum/user.enum';
import { Roles } from 'src/lib/common/decorators/roles.decorator';
import { PageOptionsDto } from 'src/lib/common/dto/pagination.dto';

@Controller('brand')
@UseGuards(AuthGuard)
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  async createBrand(@User() userId: string, @Body() data: CreateBrandDto) {
    const brand = await this.brandService.createBrand(userId, data);
    return Response.success(brand);
  }

  @Patch()
  @UseGuards(BrandGuard)
  async updateBrand(@User() userId: string, @Body() data: UpdateBrandDto) {
    const brand = await this.brandService.updateBrand(userId, data);
    return Response.success(brand);
  }

  @Get()
  async getBrand(@User() userId: string) {
    const brand = await this.brandService.getBrand(userId);
    return Response.success(brand);
  }

  @Delete()
  @UseGuards(BrandGuard)
  async deleteBrand(@User() userId: string) {
    await this.brandService.deleteBrand(userId);
    return Response.success(null, 'Brand Successfully deleted');
  }

  @Get('lists')
  @UseGuards(RoleGuard)
  @Roles(RolesEnum.ADMIN)
  async findAllBrand(@Query() pageOptionsDto: PageOptionsDto) {
    console.log(pageOptionsDto);
    return Response.success(await this.brandService.findAll(pageOptionsDto));
  }
}
