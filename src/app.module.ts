import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TopPageModule } from './top-page/top-page.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { UsersModule } from './users/users.module';
import { getMongoConfig } from './config/mongo.config';

const config = new ConfigService();
const pathToMongo = config.get('PATH_TO_MONGO');
console.log('\napp.module pathToMongo = ', pathToMongo);

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig
    }),
    AuthModule,
    TopPageModule,
    ProductModule,
    ReviewModule,
    UsersModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
