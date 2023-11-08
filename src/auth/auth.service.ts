import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { compare, genSaltSync, hashSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { UserDocument, UserModel } from './user.model';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './auth.constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
    private readonly jwtService: JwtService
  ) {}

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

  async validateUser(login: string, password: string): Promise<Pick<UserModel, 'login'>> {
    const user = await this.findUser(login);
    if (!user) {
      throw new HttpException(USER_NOT_FOUND_ERROR, HttpStatus.UNAUTHORIZED);
    }
    const isCorrectPassword = await compare(password, user.passwordHash);
    if (!isCorrectPassword) {
      throw new HttpException(WRONG_PASSWORD_ERROR, HttpStatus.UNAUTHORIZED);
    }
    return { login: user.login };
  }

  async login(login: string): Promise<{ access_token: string}> {
    const payload = { login };
    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }
}
