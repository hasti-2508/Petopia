import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Vet extends Document {
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

  @Prop()
  YearsOfExperience: number;

  @Prop({ default: 'vet' })
  role: string;

  @Prop()
  imageUrl: string;
  
  @Prop({ type: [String] })
  imageHistory: string[];

  @Prop({ type: [String] })
  services: string[];

  @Prop({ type: [Object] })
  AppointmentsToHandle: Object[];

  @Prop({ type: [Object] })
  AppointmentHistory: Object[];

  @Prop()
  description: string;

  @Prop({ default: true })
  isActive: boolean;

  // @Prop({ type: [{ type: Schema.Types.ObjectId, ref: 'Appointment' }] })
  // appointments: Appointment[];
}

export const VetSchema = SchemaFactory.createForClass(Vet);
