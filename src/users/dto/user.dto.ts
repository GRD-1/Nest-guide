import { Prop } from '@nestjs/mongoose';

export class UserDto {
  email: string;
  password: string;
  images: string[];
}
