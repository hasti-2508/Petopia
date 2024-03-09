import { Module } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ServicePlanBookingSchema } from 'src/service-plan-booking/schemas/service-plan-booking.schema';
import { TrainingPlanBookingSchema } from 'src/training-plan-booking/schemas/training-plan-booking.schema';
import { UserSchema } from 'src/user/schemas/user.schema';
import { TrainerSchema } from 'src/trainer/schemas/trainer.schema';
import { VetSchema } from 'src/vet/schemas/vet.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ServicePlanBooking', schema: ServicePlanBookingSchema },
    ]),
    MongooseModule.forFeature([
      { name: 'TrainingPlanBooking', schema: TrainingPlanBookingSchema },
    ]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [StripeController],
  providers: [StripeService],
})
export class StripeModule {}
