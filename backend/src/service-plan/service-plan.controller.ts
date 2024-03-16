import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ServicePlanService } from './service-plan.service';
import { ServicePlan } from './schemas/service-plan.schema';
import { CreateServicePlanDto } from './dto/service-plan.dto';
import { RolesGuard } from 'src/role/guard/role.guard';
import { Role } from 'src/role/role.enum';
import { Roles } from 'src/role/role.decorator';

@Controller('service-plan')
export class ServicePlanController {
    constructor(private readonly servicePlanService: ServicePlanService) {}

  @Post('/create')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async create(@Body() createServicePlanDto: CreateServicePlanDto): Promise<ServicePlan> {
    return this.servicePlanService.create(createServicePlanDto);
  }

  @Get()
  async getPlans(){
    return await this.servicePlanService.find();
  }
}
