import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Goods,
}

export class HhData {
  @Prop()
    count: number;

  @Prop()
    juneSalary: number;

  @Prop()
    middleSalary: number;

  @Prop()
    seniorSalary: number;
}

export class TopPageAdvantage {
  @Prop()
    title: string;

  @Prop()
    description: string;
}

@Schema({ timestamps: true, _id: true })
export class TopPageModel {
  @Prop({ enum: TopLevelCategory })
    firstCategory: string;

  @Prop()
    secondCategory: string;

  @Prop()
    category: string;

  @Prop({ unique: true })
    alias: string;

  @Prop()
    title: string;

  @Prop({ type: () => HhData })
    hh?: HhData;

  @Prop({ type: () => [TopPageAdvantage] })
    advantages: TopPageAdvantage[];

  @Prop()
    seoText: string;

  @Prop()
    tagsTitle: string;

  @Prop({ type: () => [String] })
    tags: string[];
}

export type TopPageDocument = HydratedDocument<TopPageModel>;
export const TopPageSchema = SchemaFactory.createForClass(TopPageModel);
