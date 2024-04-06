import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class ServicePlan extends Document {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  serviceName: string;

  @Prop({ required: true })
  species: string;

  @Prop({ type: [String] })
  services: string[];

  @Prop({ required: true })
  price: number;

  @Prop()
  average_rating: number;

  @Prop()
  imageUrl: string

}

export const ServicePlanSchema = SchemaFactory.createForClass(ServicePlan);
