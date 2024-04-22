import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class TrainingPlanBooking extends Document {
  @Prop({ required: true })
  userId: mongoose.Types.ObjectId;

  @Prop({ required: true })
  TrainingPlanId: mongoose.Types.ObjectId;

  @Prop({ required: true })
  pet_species: string;

  @Prop({ required: true })
  pet_breed: string;

  @Prop({ required: true })
  pet_size: string;

  @Prop({ required: true })
  pet_gender: string;

  @Prop({ required: true })
  pet_age: string;

  @Prop({ required: true })
  aggressiveness: string;

  @Prop({ required: true })
  user_name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phoneNo: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop()
  notes: string;

  @Prop({ required: true })
  booking_date: string;

  @Prop({ required: true })
  booking_time: string;

  @Prop()
  totalPrice: number;

  @Prop({ default: false })
  isConfirmed: boolean;

  @Prop({ default: false })
  isCompleted: boolean;

  @Prop({ default: false })
  isCancelled: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Trainer' })
  trainerId: Types.ObjectId;

  @Prop()
  ratings: any[];

  @Prop()
  averageRating: number;
}

export const TrainingPlanBookingSchema =
  SchemaFactory.createForClass(TrainingPlanBooking);
