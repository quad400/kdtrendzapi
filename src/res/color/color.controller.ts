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
import { ColorService } from './color.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { AuthGuard } from 'src/lib/common/guard/auth.guard';
import { Roles } from 'src/lib/common/decorators/roles.decorator';
import { RolesEnum } from 'src/lib/common/enum/user.enum';
import { RoleGuard } from 'src/lib/common/guard/user-roles.guard';
import { Response } from 'src/lib/common/utility/response';

@Controller('color')
@UseGuards(AuthGuard)
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Post()
  @UseGuards(RoleGuard)
  @Roles(RolesEnum.ADMIN)
  async create(@Body() createColorDto: CreateColorDto) {
    return Response.success(await this.colorService.create(createColorDto));
  }
  
  @Get()
  async findAll() {
    return Response.success(await this.colorService.findAll());
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return Response.success(await this.colorService.findOne(id));
  }
  
  @Patch(':id')
  @UseGuards(RoleGuard)
  @Roles(RolesEnum.ADMIN)
  async update(
    @Param('id') id: string,
    @Body() updateColorDto: UpdateColorDto,
  ) {
    return Response.success(await this.colorService.update(id, updateColorDto));
  }
  
  @Delete(':id')
  @UseGuards(RoleGuard)
  @Roles(RolesEnum.ADMIN)
  async remove(@Param('id') id: string) {
    await this.colorService.remove(id)
    return Response.success(null, "Color successfully deleted");
  }
}
