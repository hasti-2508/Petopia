import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateTrainerDto {
@IsNumber()
trainerId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNumber()
  @IsNotEmpty()
  phoneNo: number;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  area: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsArray()
  imageHistory?: string[];

  @IsArray()
  @IsOptional()
  services: string[];

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  @IsOptional()
  role?: string;

  YearsOfExperience: number;

  numberOfPetsTrained: number;
}
