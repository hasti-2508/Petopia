import { Module } from '@nestjs/common';
import { VetController } from './vet.controller';
import { VetService } from './vet.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VetSchema } from './schemas/vet.schema';
import { ServicePlanBookingSchema } from 'src/service-plan-booking/schemas/service-plan-booking.schema';
@Module({
  imports: [MongooseModule.forFeature([{name: "Vet", schema: VetSchema}]),
  MongooseModule.forFeature([{name: "ServicePlanBooking", schema: ServicePlanBookingSchema}]),],
  controllers: [VetController],
  providers: [VetService]
})
export class VetModule {}
