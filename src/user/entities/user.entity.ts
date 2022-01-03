import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// export type UserDocument = User & Document;
@Schema()
export class User extends Document {
  @Prop({ required: true, index: true })
  name: string;


  @Prop({ unique: true })
  username: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false, default: 0 })
  age: number;

  @Prop({ type: [String], required: false })
  favorites: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
