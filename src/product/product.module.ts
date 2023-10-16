import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './product.controller';
import { ProductModel, ProductSchema } from './product.model';

@Module({
  imports: [MongooseModule.forFeature([
    { name: ProductModel.name, schema: ProductSchema, collection: 'Product' }
  ])],
  controllers: [ProductController]
})
export class ProductModule {}
