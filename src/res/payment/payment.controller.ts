import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/payment.dto';
import { AuthGuard } from 'src/lib/common/guard/auth.guard';
import { Response } from 'src/lib/common/utility/response';
import { VerifyAccountNumberDto } from './dto/account.dto';
import { BrandGuard } from 'src/lib/common/guard/brand.guard';
import { PageOptionsDto } from 'src/lib/common/dto/pagination.dto';
import { Request } from 'express';

@Controller('payment')
@UseGuards(AuthGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async createPayment(@Query() data: CreatePaymentDto) {
    await this.paymentService.createPayment(data);
    return Response.success(null, 'Payment made successfully');
  }

  @Get('banks')
  async getBanks() {
    return Response.success(await this.paymentService.getBanks());
  }

  @Get('verify-account-number')
  async verifyAccountNumber(@Query() query: VerifyAccountNumberDto) {
    return Response.success(
      await this.paymentService.verifyAccountNumber(query),
    );
  }

  @Post('generate-accountId/:brandId')
  @UseGuards(BrandGuard)
  async generateAccountId(@Param('brandId') brandId: string) {
    return Response.success(
      await this.paymentService.generateAccountId(brandId),
    );
  }

  @Get(':brandId/list')
  @UseGuards(BrandGuard)
  async getPayments(
    @Param('brandId') brandId: string,
    @Query() query: PageOptionsDto,
  ) {
    return Response.success(
      await this.paymentService.getPayments(brandId, query),
    );
  }

  @Post('webhook')
  async handlePaystackWebhook(@Req() req: Request) {
    await this.paymentService.handlePaystackWebhook(req);
    return Response.success({ success: true });
  }

  @Post("payout/:brandId")
  @UseGuards(BrandGuard)
  async proceessPayout(
    @Param('brandId') brandId: string
  ) {
    return Response.success(
      await this.paymentService.processPayout(brandId),
    );
  }


}
