import { IsString, IsNotEmpty, IsNumber, IsArray } from 'class-validator';

export class CreateServicePlanDto {
  @IsString()
  @IsNotEmpty()
  serviceName: string;

  @IsString()
  @IsNotEmpty()
  species: string;

  @IsArray()
  @IsString({ each: true })
  services: string[];

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
