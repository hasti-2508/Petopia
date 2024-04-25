import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ServicePlanBookingService } from './service-plan-booking.service';
import { JwtService } from '@nestjs/jwt';
import { ServicePlanBooking } from './schemas/service-plan-booking.schema';
import {
  AssignVetDto,
  CreateServicePlanBookingDto,
  RateDto,
} from './dto/service-booking-plan.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { JwtInterceptor } from 'src/interceptor/jwt.interceptor';
import JwtPayload from 'src/interceptor/interface/jwtpayload';
import { Roles } from 'src/role/role.decorator';
import { RolesGuard } from 'src/role/guard/role.guard';
import { Role } from 'src/role/role.enum';

@Controller('serviceBooking')
export class ServicePlanBookingController {
  constructor(
    private readonly servicePlanBookingService: ServicePlanBookingService,
    private jwtService: JwtService,
  ) {}

  @Get('')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  async getBooking(
    @Query() query: ExpressQuery,
  ): Promise<ServicePlanBooking[]> {
    return await this.servicePlanBookingService.findBookings(query);
  }

  @Get('booking/:bookingId')
  async findBookingById(
    @Param('bookingId') bookingId: string,
  ): Promise<ServicePlanBooking> {
    return await this.servicePlanBookingService.findBookingById(bookingId);
  }

  @Get('user/:userId')
  async getService(
    @Param('userId') userId: string,
  ): Promise<ServicePlanBooking[]> {
    const booking = await this.servicePlanBookingService.findByUserId(userId);
    if (!booking) {
      throw new NotFoundException('No Booking Found for this user!');
    }
    return booking;
  }

  @Post('/:servicePlanId')
  @UseInterceptors(JwtInterceptor)
  async create(
    @Req() request,
    @Res() res,
    @Param('servicePlanId') servicePlanId: string,
    @Body() createServicePlanBookingDto: CreateServicePlanBookingDto,
  ): Promise<ServicePlanBooking> {
    const data: JwtPayload = request.token;
    if (!data) {
      throw new UnauthorizedException('Please Login First!');
    }
    const userId = data.userId;
    const booking = await this.servicePlanBookingService.bookService(
      userId,
      servicePlanId,
      createServicePlanBookingDto,
    );
    return res.json({
      booking,
    });
  }

  @Post('/assign/:bookingId')
  async assignVet(
    @Param('bookingId') bookingId: string,
    @Body() assignVetDto: AssignVetDto,
  ): Promise<ServicePlanBooking> {
    return this.servicePlanBookingService.assignVet(bookingId, assignVetDto);
  }

  @Post(':BookingId/rate')
  @UseInterceptors(JwtInterceptor)
  async rateVet(
    @Req() request,
    @Param('BookingId') BookingId: string,
    @Body() rateDto: RateDto,
  ): Promise<ServicePlanBooking> {
    const data: JwtPayload = request.token;
    if (!data) {
      throw new UnauthorizedException('No Data found');
    }
    const userId = data.userId;
    return this.servicePlanBookingService.addRating(
      userId,
      BookingId,
      rateDto.rating,
    );
  }

  @Patch(':id/complete')
  async markBookingAsComplete(
    @Param('id') id: string,
  ): Promise<ServicePlanBooking> {
    return await this.servicePlanBookingService.markBookingAsComplete(id);
  }
}
