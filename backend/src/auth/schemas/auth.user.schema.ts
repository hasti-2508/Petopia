import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { SchemaTypes } from 'mongoose';
import { Pet } from 'src/pet/schemas/pet.schema';

@Schema({ timestamps: true })
export class User {
  _id: mongoose.Types.ObjectId;

  @Prop({required: true})
  name: string;

  @Prop({required: true})
  email: string;

  @Prop({required: true})
  password: string;
  
  @Prop({required: true})
  phoneNo: number

  @Prop({required: true})
  address: string

  @Prop({required: true})
  area: string

  @Prop({required: true})
  city: string

  @Prop({required: true})
  state: string

  @Prop({ default: 'user' })
  role: string;

  @Prop({default: 'true'})
  isActive: boolean

  @Prop()
  imageUrl: string;

  @Prop({ type: [String] }) 
  imageHistory: string[];


  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Pet' }] })
  pets: Pet[];

  // @Prop({ type: [{ type: Schema.Types.ObjectId, ref: 'Appointment' }] })
  // appointments: Appointment[];

}

export const UserSchema = SchemaFactory.createForClass(User);
