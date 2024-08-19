import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'src/lib/common/utility/response';
import { User } from 'src/lib/common/decorators/user.decorator';
import { UserEntity } from './entity/user.entity';
import { AuthGuard } from 'src/lib/common/guard/auth.guard';
import { UpdateUserDto } from './dto/user.dto';
import { RolesEnum } from 'src/lib/common/enum/user.enum';
import { Roles } from 'src/lib/common/decorators/roles.decorator';
import { RoleGuard } from 'src/lib/common/guard/user-roles.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async me(@User() userId: string) {
    return Response.success(await this.userService.findById(userId));
  }

  @Patch('me')
  async updateUserAccount(@Body() data: UpdateUserDto, @User() userId: string) {
    return Response.success(
      await this.userService.updateUserAccount(data, userId),
    );
  }

  @Delete('me')
  async deleteUserAccount(@User() userId: string) {
    return await this.userService.deleteUserAccount(userId);
  }

  @Patch(':userId')
  async makeAdmin(@Body() data: string[], @Param("userId") userId: string) {
    return Response.success(await this.userService.makeAdmin(data, userId));
  }
  
  @Post(':id/block-account')
  @UseGuards(RoleGuard)
  @Roles(RolesEnum.ADMIN)
  async blockAndUnBlockAccount(@Param('id') id: string) {
    return await this.userService.blockAndUnBlockAccount(id);
  }
}
