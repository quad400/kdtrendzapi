import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { Response } from '../utility/response';

export class ValidationException extends HttpException {
  name = 'ValidationException';
}

export const CustomValidatorPipe = (): ValidationPipe => {
  return new ValidationPipe({
    exceptionFactory(errors) {
      const errorValues = errors.map((err) => {
        if (err.constraints) {
          const [message] = Object.values(err.constraints);
          const fieldName = err.property;
          return { fieldName, message };
        }
        return {
          fieldName: err.property,
          message: 'Invalid input',
        };
      });
      return Response.error(
        JSON.stringify(errorValues),
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    },
  });
};
