import {
  Body,
  Controller,
  Delete,
  Get, HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post, UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { TopPageDocument } from './top-page.model';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { PAGE_NOT_FOUND_ERROR } from './top-page.constants';
import { TopPageService } from './top-page.service';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { IdValidationPipe } from '../pipes/id-validation-pipe';
import { JwtGuard } from '../auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('top-page')
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateTopPageDto): Promise<TopPageDocument | null> {
    return this.topPageService.create(dto);
  }

  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string): Promise<TopPageDocument | null> {
    const page = await this.topPageService.findById(id);
    if (!page) throw new HttpException(PAGE_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    return page;
  }

  @Get('byAlias/:alias')
  async getByAlias(@Param('alias') alias: string): Promise<TopPageDocument | null> {
    const page = await this.topPageService.findByAlias(alias);
    if (!page) throw new HttpException(PAGE_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    return page;
  }

  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string): Promise<void> {
    const deletedPage = await this.topPageService.findById(id);
    if (!deletedPage) throw new HttpException(PAGE_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    return this.topPageService.deleteById(id);
  }

  @UsePipes(new ValidationPipe())
  @Patch(':id')
  async patch(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: CreateTopPageDto
  ): Promise<TopPageDocument | null> {
    const updatedPage = this.topPageService.updateById(id, dto);
    if (!updatedPage) throw new HttpException(PAGE_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    return updatedPage;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindTopPageDto): Promise<TopPageDocument[]> {
    return this.topPageService.findByCategory(dto.firstCategory);
  }
}
