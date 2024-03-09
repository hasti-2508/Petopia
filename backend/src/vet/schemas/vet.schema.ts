import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { ServicePlanBooking } from 'src/service-plan-booking/schemas/service-plan-booking.schema';

@Schema()
export class Vet extends Document {
  @Prop({ required: true })
  vetId: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  phoneNo: number;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  area: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({required: true})
  YearsOfExperience: number;

  @Prop({ default: 'vet' })
  role: string;

  @Prop()
  imageUrl: string;

  @Prop({ type: [String] })
  imageHistory: string[];

  @Prop({ type: [String] })
  services: string[];

  @Prop()
  description: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'ServicePlanBooking' }] })
  bookings: ServicePlanBooking[];

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'ServicePlanBooking' }] })
  bookingHistory: ServicePlanBooking[];

  @Prop({default: true})
  isAvailable: boolean;

  @Prop()
  resetToken: string;

  @Prop()
  resetTokenExpiration: Date;

}

export const VetSchema = SchemaFactory.createForClass(Vet);
