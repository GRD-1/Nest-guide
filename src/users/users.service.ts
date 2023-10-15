import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './models/user.model';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  async getByEmail(email: string): Promise<string | null> {
    return this.UserModel.findOne({ email });
  }

  async createUser(userData: UserDto): Promise<User> {
    const newUser = new this.UserModel(userData);
    return newUser.save();
  }
}
