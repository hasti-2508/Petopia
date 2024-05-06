import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TrainingPlanService } from './training-plan.service';
import { CreateTrainingPlanDto } from './dto/training-plan.dto';
import { TrainingPlan } from './schemas/training-plan.schema';
import { Roles } from 'src/role/decorator/role.decorator';
import { Role } from 'src/role/role.enum';
import { RolesGuard } from 'src/role/guard/role.guard';

@Controller('training-plan')
export class TrainingPlanController {
  constructor(private readonly trainingPlanService: TrainingPlanService) {}

  @Post('/create')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async create(
    @Body() createTrainingPlanDto: CreateTrainingPlanDto,
  ): Promise<TrainingPlan> {
    return this.trainingPlanService.create(createTrainingPlanDto);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.USER, Role.TRAINER, Role.VET)
  async getPlans(): Promise<TrainingPlan[]> {
    return await this.trainingPlanService.find();
  }
}
