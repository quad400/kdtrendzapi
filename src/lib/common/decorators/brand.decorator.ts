import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UseBrand = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.brand;
  },
);
