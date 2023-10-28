import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionLoggerFilter } from './filters/global-exception-logger.filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.useGlobalFilters(new GlobalExceptionLoggerFilter());
  await app.listen(3000);
}
bootstrap();
