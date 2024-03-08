import { Module } from '@nestjs/common';
import { TrainingPlanController } from './training-plan.controller';
import { TrainingPlanService } from './training-plan.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainingPlanSchema } from './schemas/training-plan.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: "TrainingPlan", schema: TrainingPlanSchema}])],
  controllers: [TrainingPlanController],
  providers: [TrainingPlanService]
})
export class TrainingPlanModule {}
