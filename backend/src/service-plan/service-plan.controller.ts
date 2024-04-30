import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ServicePlanService } from './service-plan.service';
import { ServicePlan } from './schemas/service-plan.schema';
import { CreateServicePlanDto } from './dto/service-plan.dto';

@Controller('service-plan')
export class ServicePlanController {
  constructor(private readonly servicePlanService: ServicePlanService) {}

  @Post('/create')
  async create(
    @Body() createServicePlanDto: CreateServicePlanDto,
  ): Promise<ServicePlan> {
    return this.servicePlanService.create(createServicePlanDto);
  }

  @Get()
  async getPlans(): Promise<ServicePlan[]> {
    return await this.servicePlanService.find();
  }
}
