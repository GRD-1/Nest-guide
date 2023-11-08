import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { genSaltSync, hashSync } from 'bcryptjs';
import { AuthDto } from './dto/auth.dto';
import { UserDocument, UserModel } from './user.model';

@Injectable()
export class AuthService {
  constructor(@InjectModel(UserModel.name) private readonly userModel: Model<UserModel>) {}

  async createUser(dto: AuthDto): Promise<UserDocument> {
    const salt = genSaltSync(10);
    const newUser = new this.userModel({
      login: dto.login,
      passwordHash: hashSync(dto.password, salt)
    });
    return newUser.save();
  }

  async findUser(login: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ login }).exec();
  }
}
