import { IsEmail, IsString, IsOptional, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  
  @IsNotEmpty()
  @IsNumber()
  phoneNo: number;
  
  @IsNotEmpty()
  @IsString()
  address: string;
  
  @IsNotEmpty()
  @IsString()
  area: string;
  
  @IsNotEmpty()
  @IsString()
  city: string;
  
  @IsNotEmpty()
  @IsString()
  state: string;

  @IsString()
  @IsOptional()
  role?: string;

  isActive:boolean;
}

