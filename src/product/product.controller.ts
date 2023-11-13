import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UsePipes, ValidationPipe
} from '@nestjs/common';
import { ProductDocument, ProductWithReviews } from './product.model';
import { FindProductDto } from './dto/find-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { IdValidationPipe } from '../pipes/id-validation-pipe';
import { PRODUCT_NOT_FOUND_ERROR } from './product.constants';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateProductDto): Promise<ProductDocument> {
    return this.productService.create(dto);
  }

  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string): Promise<ProductDocument | null> {
    const product = this.productService.findById(id);
    if (!product) throw new HttpException(PRODUCT_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    return product;
  }

  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string): Promise<void> {
    const product = this.productService.deleteById(id);
    if (!product) throw new HttpException(PRODUCT_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
  }

  @UsePipes(new ValidationPipe())
  @Patch(':id')
  async patch(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: CreateProductDto
  ): Promise<ProductDocument | null> {
    const updatedProduct = await this.productService.updateById(id, dto);
    if (!updatedProduct) throw new HttpException(PRODUCT_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    return updatedProduct;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindProductDto): Promise<ProductWithReviews[]> {
    return this.productService.findWithReviews(dto);
  }
}
