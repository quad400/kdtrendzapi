import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';

export class ValidationException extends HttpException {
  name = 'ValidationException';
}

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    switch (true) {
      case exception instanceof ValidationException: {
        const exceptionResponse = exception.getResponse();
        
        console.log(exceptionResponse)
        let errorMessage = '';
        // Assuming exceptionResponse is an array of validation error objects
        if (Array.isArray(exceptionResponse) && exceptionResponse.length > 0) {
          errorMessage = exceptionResponse[0].message;
        } else if (typeof exceptionResponse === 'string') {
          errorMessage = exceptionResponse;
        } else {
          errorMessage = 'Validation error occurred'; // Default message if structure is unexpected
        }
        const responseBody = {
          success: false,
          message: errorMessage
        };
        return httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
      }

      default: {
        const responseBody = {
          success: false,
          message: exception.message
        };
        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
      }
    }
  }
}
