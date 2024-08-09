import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import {
  FogotPasswordDto,
  LoginAccountDto,
  RegisterAccountDto,
  ResetPasswordDto,
  VerifyAccountDto,
} from './dto/authentication.dto';
import { AuthGuard } from 'src/lib/common/guard/auth.guard';
import { User } from 'src/lib/common/decorators/user.decorator';
import { UserEntity } from '../user/entity/user.entity';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  async registerAccount(@Body() registerAccountDto: RegisterAccountDto) {
    return await this.authenticationService.createUser(registerAccountDto);
  }

  @HttpCode(200)
  @Post('login')
  async loginAccount(@Body() loginAccountDto: LoginAccountDto) {
    return await this.authenticationService.login(loginAccountDto);
  }

  @HttpCode(200)
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: FogotPasswordDto) {
    return await this.authenticationService.forgotPassword(forgotPasswordDto);
  }

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Post('reset-password')
  async resetPassword(
    @User() user: UserEntity,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return await this.authenticationService.resetPassword(
      resetPasswordDto,
      user,
    );
  }

  @HttpCode(200)
  @Post('verify-account')
  async verifyAccount(@Body() verifyAccountDto: VerifyAccountDto) {
    return await this.authenticationService.verifyAccount(verifyAccountDto);
  }
}
