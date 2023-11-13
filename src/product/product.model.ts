import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ReviewModel } from '../review/review.model';

class ProductCharacteristic {
  @Prop()
    name: string;

  @Prop()
    value: string;
}

@Schema({ timestamps: true, _id: true })
export class ProductModel {
  @Prop()
    image: string;

  @Prop()
    title: string;

  @Prop()
    price: number;

  @Prop()
    oldPrice?: number;

  @Prop()
    credit: number;

  @Prop()
    description: string;

  @Prop()
    advantages: string;

  @Prop()
    disAdvantages: string;

  @Prop({ type: () => [String] })
    categories: string[];

  @Prop({ type: () => [String] })
    tags: string[];

  @Prop({ type: () => [ProductCharacteristic], id: false })
    characteristics: ProductCharacteristic[];
}

export type ProductDocument = HydratedDocument<ProductModel>;
export const ProductSchema = SchemaFactory.createForClass(ProductModel);

export interface ProductWithReviews extends ProductModel {
  reviews: ReviewModel[],
  reviewCount: number,
  reviewAvg: number
}
