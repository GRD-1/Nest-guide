import { HttpException, HttpStatus } from '@nestjs/common';

export class MyCustomException extends HttpException {
  constructor(customMessage: string) {
    super('The very specific custom exception', HttpStatus.SERVICE_UNAVAILABLE, { description: customMessage });
  }
}
