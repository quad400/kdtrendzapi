import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { BrandEntity } from 'src/res/brand/entities/brand.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BrandGuard implements CanActivate {
  constructor(
    @InjectRepository(BrandEntity)
    private readonly brandRepository: Repository<BrandEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const userId = request.user;
    const brandOwner = await this.brandRepository.findOneBy({ user_id:userId });
    if (!brandOwner) {
      throw new UnauthorizedException(
        'Permission denied, Your account type is not a seller account',
      );
    }
    request["brand"] = brandOwner.id
    return !!brandOwner;
  }
}
