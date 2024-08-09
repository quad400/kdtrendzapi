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
import { SizeService } from './size.service';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { AuthGuard } from 'src/lib/common/guard/auth.guard';
import { Roles } from 'src/lib/common/decorators/roles.decorator';
import { RolesEnum } from 'src/lib/common/enum/user.enum';
import { RoleGuard } from 'src/lib/common/guard/user-roles.guard';
import { Response } from 'src/lib/common/utility/response';

@Controller('size')
@UseGuards(AuthGuard)
export class SizeController {
  constructor(private readonly sizeService: SizeService) {}

  @Post()
  @UseGuards(RoleGuard)
  @Roles(RolesEnum.ADMIN)
  async create(@Body() createColorDto: CreateSizeDto) {
    return Response.success(this.sizeService.create(createColorDto));
  }
  
  @Get()
  async findAll() {
    return await this.sizeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return Response.success(await this.sizeService.findOne(id));
  }
  
  @Patch(':id')
  @UseGuards(RoleGuard)
  @Roles(RolesEnum.ADMIN)
  async update(
    @Param('id') id: string,
    @Body() updateColorDto: UpdateSizeDto,
  ) {
    return Response.success(await this.sizeService.update(id, updateColorDto));
  }
  
  @Delete(':id')
  @UseGuards(RoleGuard)
  @Roles(RolesEnum.ADMIN)
  async remove(@Param('id') id: string) {
    return Response.success(this.sizeService.remove(id));
  }
}
