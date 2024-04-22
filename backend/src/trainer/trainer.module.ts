import { Module } from '@nestjs/common';
import { TrainerController } from './trainer.controller';
import { TrainerService } from './trainer.service';
import { TrainerSchema } from './schemas/trainer.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainingPlanBookingSchema } from 'src/training-plan-booking/schemas/training-plan-booking.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: "Trainer", schema: TrainerSchema}]),
  MongooseModule.forFeature([{name: "TrainingPlanBooking", schema: TrainingPlanBookingSchema}]),],
  controllers: [TrainerController],
  providers: [TrainerService]
})
export class TrainerModule {}
