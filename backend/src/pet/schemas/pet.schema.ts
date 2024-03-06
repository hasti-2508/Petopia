import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';

@Schema({
    timestamps: true
})
export class Pet extends Document  {

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

  @Prop({default: true})
  isActive: string;

  @Prop()
  imageUrl: string;

  @Prop({ type: [String] }) 
  imageHistory: string[];
}

export const PetSchema = SchemaFactory.createForClass(Pet);
