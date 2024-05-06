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
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TrainingPlanBookingService } from './training-plan-booking.service';
import {
  AssignTrainerDto,
  CreateTrainingPlanBookingDto,
  RateDto,
} from './dto/training-plan-booking.dto';
import { TrainingPlanBooking } from './schemas/training-plan-booking.schema';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { JwtInterceptor } from 'src/interceptor/jwt.interceptor';
import JwtPayload from 'src/interceptor/interface/jwtpayload';
import { Roles } from 'src/role/decorator/role.decorator';
import { RolesGuard } from 'src/role/guard/role.guard';
import { Role } from 'src/role/role.enum';

@Controller('trainingBooking')
export class TrainingPlanBookingController {
  constructor(private TrainingPlanBookingService: TrainingPlanBookingService) {}

  @Get('')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async getTrainings(
    @Query() query: ExpressQuery,
  ): Promise<TrainingPlanBooking[]> {
    return await this.TrainingPlanBookingService.findTrainings(query);
  }

  @Get('booking/:bookingId')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.USER , Role.TRAINER, Role.VET)
  async findBookingById(
    @Param('bookingId') bookingId: string,
  ): Promise<TrainingPlanBooking> {
    const booking =
      await this.TrainingPlanBookingService.findBookingById(bookingId);
    return booking;
  }

  @Get('user/:userId')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.USER , Role.TRAINER, Role.VET)
  async getTraining(
    @Param('userId') userId: string,
  ): Promise<TrainingPlanBooking[]> {
    const booking = await this.TrainingPlanBookingService.findByUserId(userId);
    if (!booking) {
      throw new NotFoundException('No Booking Found for this user!');
    }
    return booking;
  }

  @Post('/:TrainingPlanId')
  @UseInterceptors(JwtInterceptor)
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.USER , Role.TRAINER, Role.VET)
  async create(
    @Req() request,
    @Param('TrainingPlanId') TrainingPlanId: string,
    @Body() createTrainingPlanBookingDto: CreateTrainingPlanBookingDto,
  ): Promise<TrainingPlanBooking> {
    const data: JwtPayload = request.token;
    if (!data) {
      throw new UnauthorizedException('No Data found');
    }
    const userId = data.userId;
    return this.TrainingPlanBookingService.bookService(
      userId,
      TrainingPlanId,
      createTrainingPlanBookingDto,
    );
  }

  @Post('/assign/:bookingId')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async assignTrainer(
    @Param('bookingId') bookingId: string,
    @Body() assignTrainerDto: AssignTrainerDto,
  ): Promise<TrainingPlanBooking> {
    return await this.TrainingPlanBookingService.assignTrainer(
      bookingId,
      assignTrainerDto,
    );
  }

  @Post(':BookingId/rate')
  @UseGuards(RolesGuard)
  @Roles(Role.USER)
  @UseInterceptors(JwtInterceptor)
  async rateVet(
    @Req() request,
    @Param('BookingId') BookingId: string,
    @Body() rateDto: RateDto,
  ): Promise<TrainingPlanBooking> {
    const data = request.token;
    if (!data) {
      throw new UnauthorizedException('No Data found!');
    }
    const userId = data.userId;
    return this.TrainingPlanBookingService.addRating(
      userId,
      BookingId,
      rateDto.rating,
    );
  }

  @Patch('/:id/complete')
  @UseGuards(RolesGuard)
  @Roles(Role.TRAINER)
  async markTrainingAsComplete(
    @Param('id') id: string,
  ): Promise<TrainingPlanBooking> {
    return this.TrainingPlanBookingService.markTrainingAsComplete(id);
  }
}
