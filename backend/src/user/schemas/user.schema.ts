import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { SchemaTypes, Document } from 'mongoose';
import { Pet } from 'src/pet/schemas/pet.schema';

@Schema({ timestamps: true })
export class User extends Document {
  _id: mongoose.Types.ObjectId;

  @Prop({required: true})
  name: string;

  @Prop({required: true})
  email: string;

  @Prop({required: true})
  password: string;
  
  @Prop({required: true})
  phoneNo: string

  @Prop({required: true})
  address: string

  @Prop({required: true})
  city: string

  @Prop({required: true})
  state: string

  @Prop({ default: 'user' })
  role: string;

  @Prop({default: 'true'})
  isActive: boolean

  @Prop()
  imageUrl: string;

  @Prop({ type: [String] }) 
  imageHistory: string[];


  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Pet' }] })
  pets: string[];

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Pet' }] }) 
  petHistory: string[];

  @Prop()
  resetToken: string;

  @Prop()
  resetTokenExpiration: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);
