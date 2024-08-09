import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UserEntity } from '../user/entity/user.entity';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(to: string, subject: string, template: string, context: any) {
    await this.mailerService.sendMail({
      to,
      subject,
      template,
      context,
    });
  }

  async sendUserWelcome(user: UserEntity) {
    await this.sendEmail(user.email, 'Welcome to our application!', 'welcome', {
      fullName: user.fullName,
      verification_code: user.verification_code
    });
  }
}
