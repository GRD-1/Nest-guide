import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { UserDocument } from './user.model';
import { ALREADY_REGISTERED_ERROR } from './auth.constants';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: AuthDto): Promise<UserDocument> {
    const oldUser = await this.authService.findUser(dto.login);
    if (oldUser) throw new BadRequestException(ALREADY_REGISTERED_ERROR);
    return this.authService.createUser(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDto): Promise<{ access_token: string}> {
    const user = await this.authService.validateUser(dto.login, dto.password);
    return this.authService.login(user.login);
  }
}
