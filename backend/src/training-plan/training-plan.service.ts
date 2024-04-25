import { Injectable } from '@nestjs/common';
import { TrainingPlan } from './schemas/training-plan.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTrainingPlanDto } from './dto/training-plan.dto';

@Injectable()
export class TrainingPlanService {
  constructor(
    @InjectModel(TrainingPlan.name)
    private TrainingPlanModel: Model<TrainingPlan>,
  ) {}

  async find(): Promise<TrainingPlan[]> {
    return await this.TrainingPlanModel.find();
  }

  async create(
    createTrainingPlanDto: CreateTrainingPlanDto,
  ): Promise<TrainingPlan> {
    const createdTrainingPlan = new this.TrainingPlanModel(
      createTrainingPlanDto,
    );
    return createdTrainingPlan.save();
  }
}
