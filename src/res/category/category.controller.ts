import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { AuthGuard } from 'src/lib/common/guard/auth.guard';
import { RoleGuard } from 'src/lib/common/guard/user-roles.guard';
import { Roles } from 'src/lib/common/decorators/roles.decorator';
import { RolesEnum } from 'src/lib/common/enum/user.enum';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Response } from 'src/lib/common/utility/response';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(RolesEnum.ADMIN)
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return Response.success(
      await this.categoryService.createCategory(createCategoryDto),
    );
  }

  @Get()
  async findAll() {
    return Response.success(await this.categoryService.findAllCategory());
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(RolesEnum.ADMIN)
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return Response.success(
      await this.categoryService.updateCategory(id, updateCategoryDto),
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(RolesEnum.ADMIN)
  async remove(@Param('id') id: string) {
    await this.categoryService.remove(id);
    return Response.success('Category deleted successfully');
  }
}
