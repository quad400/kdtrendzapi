import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailService } from './mailer.service';
import { join } from 'path';

@Module({
  imports: [
    // ConfigModule,
    // MailerModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     transport: {
    //       host: configService.get('MAIL_HOST'),
    //       port: configService.get('MAIL_PORT'),
    //       auth: {
    //         user: configService.get('MAIL_NAME'),
    //         pass: configService.get('MAIL_PASS'),
    //       },
    //     },
    //     defaults: {
    //       from: '"No Reply" <no-reply@example.com>',
    //     },
    //     template: {
    //       dir: join(__dirname, 'templates'),
    //       adapter: new (require('nodemailer-express-handlebars').NodemailerExpressHandlebars)({
    //         viewEngine: {
    //           extName: '.hbs',
    //           partialsDir: join(__dirname, 'templates'),
    //           layoutsDir: join(__dirname, 'templates'),
    //           defaultLayout: '',
    //         },
    //         viewPath: join(__dirname, 'templates'),
    //         extName: '.hbs',
    //       }),
    //       options: {
    //         strict: true,
    //       },
    //     },
    //   }),
    //   inject: [ConfigService],
    // }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailerConfigModule {}
