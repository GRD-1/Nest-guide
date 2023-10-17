import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ReviewDocument, ReviewModel } from './review.model';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor(@InjectModel(ReviewModel.name) private readonly ReviewModelLocal: Model<ReviewDocument>) {}

  async create(dto: CreateReviewDto): Promise<ReviewModel> {
    const newReview = new this.ReviewModelLocal(dto);
    return newReview.save();
  }

  async delete(id: string): Promise<ReviewModel | null> {
    return this.ReviewModelLocal.findByIdAndDelete(id).exec();
  }

  async findById(id: string): Promise<ReviewModel | null> {
    return this.ReviewModelLocal.findById(id).exec();
  }

  async findByProductId(productId: string): Promise<ReviewModel[]> {
    return this.ReviewModelLocal.find({ productId }).exec();
  }
}
