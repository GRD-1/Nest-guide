import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export class CICDTEST {
  testMethod(a: string): void {
    console.log('text text text text');
    const uselessConst = 25;
  }
}
