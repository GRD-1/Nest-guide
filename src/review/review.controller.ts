import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReviewModel } from './review.model';

@Controller('review')
export class ReviewController {
  @Post('create')
  async create(@Body() dto: Omit<ReviewModel, '_id'>): Promise<void> {}

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {}

  @Get('byProductId/:productId')
  async get(@Param('productId') productId: string): Promise<void> {}
}
