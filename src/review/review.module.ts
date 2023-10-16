import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewController } from './review.controller';
import { ReviewModel, ReviewSchema } from './review.model';

@Module({
  imports: [MongooseModule.forFeature([
    { name: ReviewModel.name, schema: ReviewSchema, collection: 'Review' }
  ])],
  controllers: [ReviewController]
})
export class ReviewModule {}
