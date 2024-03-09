import { IsString, IsNotEmpty, IsNumber, IsEmail, IsPositive, Min, Max } from 'class-validator';

export class CreateTrainingPlanBookingDto {

  @IsString()
  @IsNotEmpty()
  pet_breed: string;

  @IsString()
  @IsNotEmpty()
  pet_size: string;

  @IsString()
  @IsNotEmpty()
  pet_gender: string;

  @IsNumber()
  @IsNotEmpty()
  pet_age: number;

  @IsString()
  @IsNotEmpty()
  aggressiveness: string;

  @IsString()
  @IsNotEmpty()
  user_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  phoneNo: number;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  notes: string;

  totalPrice: number;
}


export class AssignTrainerDto{
  @IsNumber()
  TrainerId :number;
}

export class RateDto {
  @IsNumber()
  @IsPositive()
  @Min(1)
  @Max(5)
  rating: number;
}