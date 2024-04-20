import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { TrainingPlanBooking } from 'src/training-plan-booking/schemas/training-plan-booking.schema';

@Schema({
  timestamps: true,
})
export class Trainer extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Trainer' }) 
  trainerId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  phoneNo: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop()
  YearsOfExperience: number;

  @Prop()
  NumberOfPetsTrained: number;

  @Prop({ default: 'trainer' })
  role: string;

  @Prop({ type: [String] })
  imageHistory: string[];

  @Prop({ type: [String] })
  trainings: string[];

  @Prop({ type: [Object] })
  OnGoingTraining: Object[];

  @Prop({ type: [Object] })
  TrainingHistory: Object[];

  @Prop()
  description: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({default: true})
  isAvailable: boolean;

  @Prop()
  imageUrl?: string;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'ServicePlanBooking' }] })
  bookings: TrainingPlanBooking[];

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'ServicePlanBooking' }] })
  bookingHistory: TrainingPlanBooking[];


}

export const TrainerSchema = SchemaFactory.createForClass(Trainer);
