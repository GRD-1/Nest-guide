import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true, _id: true })
export class AuthModel {
  @Prop({ unique: true })
    email: string;

  @Prop({ required: true })
    passwordHash: string;
}

export type AuthDocument = HydratedDocument<AuthModel>;
export const AuthSchema = SchemaFactory.createForClass(AuthModel);
