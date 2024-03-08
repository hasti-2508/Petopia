import { Injectable } from '@nestjs/common';
import { CreateServicePlanDto } from './dto/service-plan.dto';
import { Model } from 'mongoose';
import { ServicePlan } from './schemas/service-plan.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ServicePlanService {
  constructor(
    @InjectModel(ServicePlan.name)
    private servicePlanModel: Model<ServicePlan>,
  ) {}

  async create(
    createServicePlanDto: CreateServicePlanDto,
  ): Promise<ServicePlan> {
    const createdServicePlan = new this.servicePlanModel(createServicePlanDto);
    return createdServicePlan.save();
  }
}
