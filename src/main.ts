import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionLoggerFilter } from './filters/global-exception-logger.filter';
import { LOGGER_CONFIG } from './config/logger.config';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    logger: [...LOGGER_CONFIG]
  });
  app.setGlobalPrefix('/api');
  app.useGlobalFilters(new GlobalExceptionLoggerFilter());
  await app.listen(3000);
}
bootstrap();
