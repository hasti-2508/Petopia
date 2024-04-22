import { Module } from '@nestjs/common';
import { ServicePlanBookingController } from './service-plan-booking.controller';
import { ServicePlanBookingService } from './service-plan-booking.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ServicePlanBookingSchema } from './schemas/service-plan-booking.schema';
import { UserSchema } from 'src/user/schemas/user.schema';
import { ServicePlanSchema } from 'src/service-plan/schemas/service-plan.schema';
import { VetSchema } from 'src/vet/schemas/vet.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ServicePlanBooking', schema: ServicePlanBookingSchema },
    ]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: 'ServicePlan', schema: ServicePlanSchema },
    ]),
    MongooseModule.forFeature([{ name: 'Vet', schema: VetSchema }]),
  ],
  controllers: [ServicePlanBookingController],
  providers: [ServicePlanBookingService],
})
export class ServicePlanBookingModule {}
