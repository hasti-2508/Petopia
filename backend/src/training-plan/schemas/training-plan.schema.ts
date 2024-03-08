import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class TrainingPlan extends Document{
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  TrainingName: string;
  
  @Prop({ type: [String] })
  Training : string[]; 

  @Prop({ required: true })
  price: number; 

  @Prop({ type: [String] })
  requirements: string[]
}

export const TrainingPlanSchema = SchemaFactory.createForClass(TrainingPlan);
