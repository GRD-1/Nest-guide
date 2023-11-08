import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReviewDocument, ReviewModel } from './review.model';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor(@InjectModel(ReviewModel.name) private readonly reviewModel: Model<ReviewDocument>) {}

  async create(dto: CreateReviewDto): Promise<ReviewModel> {
    const newReview = new this.reviewModel(dto);
    return newReview.save();
  }

  async delete(id: string): Promise<ReviewModel | null> {
    return this.reviewModel.findByIdAndDelete(id).exec();
  }

  async findById(id: string): Promise<ReviewModel | null> {
    return this.reviewModel.findById(id).exec();
  }

  async findByProductId(productId: string): Promise<ReviewModel[]> {
    return this.reviewModel.find({ productId }).exec();
  }

  async deleteByProductId(productId: string): Promise<{ deletedCount: number }> {
    return this.reviewModel.deleteMany({ productId }).exec();
  }
}
