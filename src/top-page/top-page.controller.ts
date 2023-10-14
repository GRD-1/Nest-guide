import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TopPageModel } from './top-page.model';
import { FindTopPageDto } from './dto/find-top-page.dto';

@Controller('top-page')
export class TopPageController {
  @Post('create')
  async create(@Body() dto: Omit<TopPageModel, '_id'>): Promise<void> {}

  @Get(':id')
  async get(@Param('id') id: string): Promise<void> {}

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {}

  @Patch('id')
  async patch(@Param(':id') id: string, dto: TopPageModel): Promise<void> {}

  @Post('find')
  async find(@Body() dto: FindTopPageDto): Promise<void> {}
}
