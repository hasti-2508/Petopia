import { IsEmail, IsString, IsNotEmpty, IsNumber, IsArray, IsOptional } from 'class-validator';
export class CreateVetDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

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

  @IsOptional()
  @IsString()
  imageUrl: string;

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
}
