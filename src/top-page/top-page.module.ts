import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TopPageController } from './top-page.controller';
import { TopPageModel, TopPageSchema } from './top-page.model';
import { TopPageService } from './top-page.service';

@Module({
  imports: [MongooseModule.forFeature([
    { name: TopPageModel.name, schema: TopPageSchema, collection: 'TopPage' }
  ])],
  controllers: [TopPageController],
  providers: [TopPageService]
})
export class TopPageModule {}
