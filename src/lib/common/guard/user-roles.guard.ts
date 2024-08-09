import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesEnum } from '../enum/user.enum';
import { UserService } from 'src/res/user/user.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<RolesEnum[]>(
      'roles',
      context.getHandler(),
    );
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const userId = request.user;
    const user = await this.userService.findById(userId);
    const matched = matchRoles(roles, user.roles);
    if (!matched)
      throw new UnauthorizedException(
        'Permission denied, Ask Admin user for permission',
      );
    return matched;
  }
}

function matchRoles(roles: string[], userRoles: string[]): boolean {
  return roles.some((role) => userRoles.includes(role));
}
