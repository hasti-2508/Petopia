import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TrainingPlanService } from './training-plan.service';
import { CreateTrainingPlanDto } from './dto/training-plan.dto';
import { TrainingPlan } from './schemas/training-plan.schema';

@Controller('training-plan')
export class TrainingPlanController {
  constructor(private readonly trainingPlanService: TrainingPlanService) {}

  @Post('/create')
  async create(
    @Body() createTrainingPlanDto: CreateTrainingPlanDto,
  ): Promise<TrainingPlan> {
    return this.trainingPlanService.create(createTrainingPlanDto);
  }

  @Get()
  async getPlans(): Promise<TrainingPlan[]> {
    return await this.trainingPlanService.find();
  }
}
