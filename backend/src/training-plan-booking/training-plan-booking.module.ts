import { Module } from '@nestjs/common';
import { TrainingPlanBookingController } from './training-plan-booking.controller';
import { TrainingPlanBookingService } from './training-plan-booking.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainingPlanBookingSchema } from './schemas/training-plan-booking.schema';
import { TrainingPlanSchema } from 'src/training-plan/schemas/training-plan.schema';
import { UserSchema } from 'src/user/schemas/user.schema';
import { TrainerSchema } from 'src/trainer/schemas/trainer.schema';

@Module({
  imports:[MongooseModule.forFeature([{name: "TrainingPlanBooking", schema: TrainingPlanBookingSchema}]),
  MongooseModule.forFeature([{name: "User", schema: UserSchema}]),
  MongooseModule.forFeature([{name: "TrainingPlan", schema: TrainingPlanSchema}]),
  MongooseModule.forFeature([{name: "Trainer", schema: TrainerSchema}]) 
],
  controllers: [TrainingPlanBookingController],
  providers: [TrainingPlanBookingService]
})
export class TrainingPlanBookingModule {}
