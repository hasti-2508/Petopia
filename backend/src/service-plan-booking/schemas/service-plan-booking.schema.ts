import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class ServicePlanBooking extends Document{

  @Prop({ required: true })
  userId: mongoose.Types.ObjectId;

  @Prop({ required: true })
  servicePlanId: mongoose.Types.ObjectId;

  @Prop({ required: true })
  pet_breed: string;

  @Prop({ required: true })
  pet_size: string;

  @Prop({ required: true })
  pet_gender: string;

  @Prop({ required: true })
  pet_age: number;

  @Prop({ required: true })
  aggressiveness: string;

  @Prop({ required: true })
  user_name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phoneNo: number;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop()
  notes: string;

  @Prop({ required: true })
  Booking_Date: Date;

  @Prop()
  totalPrice: number;

  @Prop({ default: false })
  isConfirmed: boolean;

  @Prop({ default: false })
  isCompleted: boolean;

  @Prop({ default: false })
  isCancelled: boolean;

  @Prop() 
  vetId: number;
}

export const ServicePlanBookingSchema =
  SchemaFactory.createForClass(ServicePlanBooking);
