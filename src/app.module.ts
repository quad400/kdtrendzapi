import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './lib/db/data-source';
import { UserModule } from './res/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationModule } from './res/authentication/authentication.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { JwtModule } from '@nestjs/jwt';
import { UploadModule } from './res/upload/upload.module';
import { CategoryModule } from './res/category/category.module';
import { SizeModule } from './res/size/size.module';
import { ColorModule } from './res/color/color.module';
import { BrandModule } from './res/brand/brand.module';
import { CloudinaryConfigService } from './lib/config/cloudinary.config';
import { ProductModule } from './res/product/product.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ConfigModule.forRoot(),
    UserModule,
    AuthenticationModule,
    UploadModule,
    CategoryModule,
    SizeModule,
    ColorModule,
    BrandModule,
    ProductModule
  ],
  providers: [CloudinaryConfigService]
})
export class AppModule {

}
