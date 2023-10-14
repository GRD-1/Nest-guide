import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TopPageModule } from './top-page/top-page.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';

const config = new ConfigService();
const pathToMongo = config.get('PATH_TO_MONGO');
console.log('\napp.module pathToMongo = ', pathToMongo);

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('PATH_TO_MONGO')
      }),
      inject: [ConfigService]
    }),
    AuthModule,
    TopPageModule,
    ProductModule,
    ReviewModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
