import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Response } from 'express';
import * as process from 'process';
import { MyCustomException } from './exceptions/custom-exceptions';

@Catch(MyCustomException)
export class MyCustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const logger = new Logger('CustomException');
    const targetRegExp = /\/projectFiles/gi;
    const localProjectRoot = process.env.LOCAL_PROJECT_ROOT ? process.env.LOCAL_PROJECT_ROOT : '/projectRoot';
    const localStack = exception?.stack?.replace(targetRegExp, localProjectRoot);
    logger.error(localStack);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    response
      .status(status)
      .json({
        statusCode: status,
        message: exception.message
      });
  }
}
