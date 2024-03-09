import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

@Schema({
  timestamps: true,
})
export class Pet extends Document {
  _id: mongoose.Types.ObjectId;
  
  @Prop({ required: true })
  pet_name: string;

  @Prop({ required: true })
  species: string;

  @Prop({ required: true })
  breed: string;

  @Prop()
  age: number;

  @Prop()
  city: string

  @Prop()
  state: string

  @Prop()
  gender: string;

  @Prop()
  color: string;

  @Prop()
  weight: number;

  @Prop()
  health_status: string;

  @Prop()
  allergies: string;

  @Prop()
  additional_notes: string;

  @Prop({ default: true })
  isActive: string;

  @Prop()
  imageUrl: string;

  @Prop({ type: [String] })
  imageHistory: string[];

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'User' }] })
  owner: User['_id'];

  @Prop({ default: false })
  isAdopted: boolean;
}

export const PetSchema = SchemaFactory.createForClass(Pet);
