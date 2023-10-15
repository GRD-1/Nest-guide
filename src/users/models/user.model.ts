import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

// eslint-disable-next-line no-use-before-define
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
    email: string;

  @Prop({ required: true })
    password: string;

  @Prop([String])
    images: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
