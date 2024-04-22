import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

@Schema({
  timestamps: true,
})
export class Pet extends Document {
  _id: mongoose.Types.ObjectId;
  
  @Prop()
  pet_name: string;

  @Prop()
  species: string;

  @Prop()
  breed: string;

  @Prop()
  age: string;

  @Prop()
  city: string

  @Prop()
  state: string

  @Prop()
  gender: string;

  @Prop()
  color: string;

  @Prop()
  weight: string;

  @Prop()
  health_conditions: string;

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
