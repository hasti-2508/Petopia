import { Prop } from '@nestjs/mongoose';
import { IsString, IsNotEmpty, IsNumber, IsDate, IsEmail, IsPositive, Min, Max } from 'class-validator';
import { Types } from 'mongoose';

export class CreateServicePlanBookingDto {

  @IsString()
  @IsNotEmpty()
  pet_species: string;

  @IsString()
  @IsNotEmpty()
  pet_breed: string;

  @IsString()
  @IsNotEmpty()
  pet_size: string;

  @IsString()
  @IsNotEmpty()
  pet_gender: string;

  @IsString()
  @IsNotEmpty()
  pet_age: string;

  @IsString()
  @IsNotEmpty()
  aggressiveness: string;

  @IsString()
  @IsNotEmpty()
  user_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phoneNo: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  booking_date: string
  
  @IsString()
  @IsNotEmpty()
  booking_time: string

  notes: string;

  totalPrice: number;
}


export class AssignVetDto{
  @Prop({ type: Types.ObjectId, ref: 'Vet' })
  vetId: Types.ObjectId; 
}


export class RateDto {
  @IsNumber()
  @IsPositive()
  @Min(1)
  @Max(5)
  rating: number;
}