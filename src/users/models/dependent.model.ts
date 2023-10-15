import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MSchema } from 'mongoose';
import { User } from './user.model';

// eslint-disable-next-line no-use-before-define
export type DependentDocument = HydratedDocument<DependentFromUserIssue>;

@Schema()
export class DependentFromUserIssue {
  @Prop({ required: true })
    title: string;

  @Prop({ required: true })
    description: string;

  @Prop({ type: MSchema.Types.ObjectId, ref: User.name })
    author: User;
}

export const DependentFromUserIssueSchema = SchemaFactory.createForClass(DependentFromUserIssue);
