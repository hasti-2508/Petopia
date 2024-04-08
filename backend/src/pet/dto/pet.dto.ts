import { IsString, IsNumber, IsOptional } from 'class-validator';

export class PetDto {
  @IsString()
  pet_name: string;

  @IsString()
  species: string;

  @IsString()
  breed: string;

  @IsString()
  age: string;

  @IsString()
  gender: string;

  @IsString()
  @IsOptional()
  color: string;

  @IsString()
  @IsOptional()
  weight: string;

  @IsString()
  @IsOptional()
  health_conditions: string;

  @IsString()
  @IsOptional()
  allergies: string;

  @IsString()
  @IsOptional()
  additional_notes: string;

  isActive:string;
  
  isAdopted: boolean; 

  @IsOptional()
  imageUrl: string;
}

export class PetFilterDto {
  species?: string;
  breed?: string;
  age?: number;
  gender?: string;
  city?: string;
  state?: string;
}

export class PetSortDto {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}
