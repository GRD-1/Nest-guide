import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req, UseFilters, UsePipes, ValidationPipe
} from '@nestjs/common';
import { Request } from 'express';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './review.constants';
import { ReviewModel } from './review.model';
import { MyCustomException } from '../filters/exceptions/custom-exceptions';
import { MyCustomExceptionFilter } from '../filters/custom-exception.filter';
import { IdValidationPipe } from './pipes/id-validation-pipe';

@Controller('review')
@UseFilters(MyCustomExceptionFilter)
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateReviewDto, @Req() request: Request): Promise<ReviewModel> {
    return this.reviewService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string): Promise<number> {
    const deletedDoc = await this.reviewService.delete(id);
    if (!deletedDoc) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return 1;
  }

  @Get('byProductId/:productId')
  async get(@Param('productId') productId: string): Promise<ReviewModel[] | null> {
    return this.reviewService.findByProductId(productId);
  }

  @Delete('byProductId/:productId')
  async deleteByProductId(@Param('productId') productId: string): Promise<{ deletedCount: number }> {
    return this.reviewService.deleteByProductId(productId);
  }

  @Get('exception')
  async getException(): Promise<HttpException> {
    throw new MyCustomException('Database is unavailable');
  }
}
