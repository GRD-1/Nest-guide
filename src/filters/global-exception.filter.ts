import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost): void {
    console.error(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const exceptionIsHandled = exception instanceof HttpException;
    const status = exceptionIsHandled ? exception.getStatus() : 500;
    const message = exceptionIsHandled ? exception.message : 'internal server error';
    response
      .status(status)
      .json({
        statusCode: status,
        message
      });
  }
}
