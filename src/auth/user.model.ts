import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true, _id: true })
export class UserModel {
  @Prop({ unique: true })
    login: string;

  @Prop({ required: true })
    passwordHash: string;
}

export type UserDocument = HydratedDocument<UserModel>;
export const UserSchema = SchemaFactory.createForClass(UserModel);
