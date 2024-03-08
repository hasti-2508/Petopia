import { Module } from '@nestjs/common';
import { ServicePlanController } from './service-plan.controller';
import { ServicePlanService } from './service-plan.service';
import { ServicePlanSchema } from './schemas/service-plan.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: "ServicePlan", schema: ServicePlanSchema }])],
  controllers: [ServicePlanController],
  providers: [ServicePlanService]
})
export class ServicePlanModule {}
