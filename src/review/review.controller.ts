import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req
} from '@nestjs/common';
import { Request } from 'express';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './review.constants';
import { ReviewModel } from './review.model';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('create')
  async create(@Body() dto: CreateReviewDto, @Req() request: Request): Promise<ReviewModel> {
    return this.reviewService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    const deletedDoc = this.reviewService.delete(id);
    if (!deletedDoc) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  @Get('byProductId/:productId')
  async get(@Param('productId') productId: string): Promise<ReviewModel[] | null> {
    return this.reviewService.findByProductId(productId);
  }

  @Delete('byProductId/:productId')
  async deleteByProductId(@Param('productId') productId: string): Promise<{ deletedCount: number }> {
    return this.reviewService.deleteByProductId(productId);
  }
}
