import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { MyCustomException } from './exceptions/custom-exceptions';

@Catch(MyCustomException)
export class MyCustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    console.log('\n++ MyCustomExceptionFilter');
    console.error(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    response
      .status(status)
      .json({
        statusCode: status,
        message: exception.message
      });
    console.log('-- MyCustomExceptionFilter\n');
  }
}
