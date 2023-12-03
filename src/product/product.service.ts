import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDocument, ProductModel, ProductWithReviews } from './product.model';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel(ProductModel.name) private readonly productModel: Model<ProductModel>) {}

  async create(dto: CreateProductDto): Promise<ProductDocument> {
    return this.productModel.create(dto);
  }

  async findById(id: string): Promise<ProductDocument | null> {
    return this.productModel.findById(id).exec();
  }

  async deleteById(id: string): Promise<unknown> {
    return this.productModel.findByIdAndDelete(id).exec();
  }

  async updateById(id: string, dto: CreateProductDto): Promise<ProductDocument | null> {
    return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async findWithReviews(dto: FindProductDto): Promise<ProductWithReviews[]> {
    return (await this.productModel
      .aggregate([
        {
          $match: {
            categories: dto.category
          }
        },
        {
          $sort: {
            _id: 1
          }
        },
        {
          $limit: dto.limit
        },
        {
          $lookup: {
            from: 'Review',
            let: { productIdStr: { $toString: '$_id' } },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ['$productId', '$$productIdStr'] }
                }
              }
            ],
            as: 'reviews'
          }
        },
        {
          $addFields: {
            reviewCount: { $size: '$reviews' },
            reviewAvg: { $avg: '$reviews.rating' },
            reviews: {
              $function: {
                body: `function (reviews) {
                reviews.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
                return reviews;
              }`,
                args: ['$reviews'],
                lang: 'js'
              }
            }
          }
        }
      ])
      .exec()) as unknown as Promise<ProductWithReviews[]>;
  }
}
