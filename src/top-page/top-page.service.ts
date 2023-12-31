import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TopLevelCategory, TopPageDocument, TopPageModel } from './top-page.model';
import { CreateTopPageDto } from './dto/create-top-page.dto';

@Injectable()
export class TopPageService {
  constructor(@InjectModel(TopPageModel.name) private readonly topPageModel: Model<TopPageModel>) {}

  async create(dto: CreateTopPageDto): Promise<TopPageDocument> {
    return this.topPageModel.create(dto);
  }

  async findById(id: string): Promise<TopPageDocument | null> {
    return this.topPageModel.findById(id).exec();
  }

  async findByAlias(alias: string): Promise<TopPageDocument | null> {
    return this.topPageModel.findOne({ alias }).exec();
  }

  async findByCategory(firstCategory: TopLevelCategory): Promise<TopPageDocument[]> {
    return this.topPageModel.aggregate([
      {
        $match: {
          firstCategory
        }
      },
      {
        $group: {
          _id: { secondCategory: '$secondCategory' },
          pages: { $push: { alias: '$alias', title: '$title' } }
        }
      }
    ]).exec();
  }

  async findByText(text: string): Promise<TopPageDocument[]> {
    return this.topPageModel.find({
      $text: {
        $search: text,
        $caseSensitive: false
      }
    }).exec();
  }

  async updateById(id: string, dto: CreateTopPageDto): Promise<TopPageDocument | null> {
    return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async deleteById(id: string): Promise<void> {
    await this.topPageModel.findByIdAndDelete(id).exec();
  }
}
