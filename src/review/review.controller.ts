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

/* eslint-disable import/order */
import { ConfigService } from '@nestjs/config';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService, private configService: ConfigService) {}

  @Post('create')
  async create(@Body() dto: CreateReviewDto, @Req() request: Request): Promise<ReviewModel> {
    console.log('\nReviewController dto', dto);
    console.log('request.body:', request.body);
    console.log('MONGO_LOGIN', this.configService.get('MONGO_LOGIN'));
    console.log('MONGO_PASSWORD', this.configService.get('MONGO_PASSWORD'));
    console.log('MONGO_HOST', this.configService.get('MONGO_HOST'));
    console.log('MONGO_PORT', this.configService.get('MONGO_PORT'));
    console.log('MONGO_DATABASE', this.configService.get('MONGO_DATABASE'));
    console.log('RAVOLY', this.configService.get('RAVOLY'));

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
}
