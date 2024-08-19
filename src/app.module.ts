import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './lib/db/data-source';
import { UserModule } from './res/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationModule } from './res/authentication/authentication.module';
import { UploadModule } from './res/upload/upload.module';
import { CategoryModule } from './res/category/category.module';
import { SizeModule } from './res/size/size.module';
import { ColorModule } from './res/color/color.module';
import { BrandModule } from './res/brand/brand.module';
import { CloudinaryConfigService } from './lib/config/cloudinary.config';
import { ProductModule } from './res/product/product.module';
import { CartModule } from './res/cart/cart.module';
import { OrderModule } from './res/order/order.module';
import { PaymentModule } from './res/payment/payment.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ConfigModule.forRoot({isGlobal: true}),
    UserModule,
    AuthenticationModule,
    UploadModule,
    CategoryModule,
    SizeModule,
    ColorModule,
    BrandModule,
    ProductModule,
    CartModule,
    OrderModule,
    PaymentModule
  ],
  providers: [CloudinaryConfigService]
})
export class AppModule {

}
