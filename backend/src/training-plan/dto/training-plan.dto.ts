import { IsString, IsNotEmpty, IsNumber, IsArray } from 'class-validator';

export class CreateTrainingPlanDto {
  @IsString()
  @IsNotEmpty()
  TrainingName: string;

  @IsArray()
  @IsString({ each: true })
  Training: string[];

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsArray()
  @IsString({ each: true })
  requirements: string[];
}
