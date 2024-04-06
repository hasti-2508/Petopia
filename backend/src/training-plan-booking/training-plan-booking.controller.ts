import {
  Body,
  Controller,
  Get,
  HttpException,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TrainingPlanBookingService } from './training-plan-booking.service';
import {
  AssignTrainerDto,
  CreateTrainingPlanBookingDto,
  RateDto,
} from './dto/training-plan-booking.dto';
import { TrainingPlanBooking } from './schemas/training-plan-booking.schema';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('trainingBooking')
export class TrainingPlanBookingController {
  constructor(
    private readonly TrainingPlanBookingService: TrainingPlanBookingService,
    private jwtService: JwtService,
  ) {}

  @Get('')
  async getTrainings(
    @Query() query: ExpressQuery,
  ): Promise<TrainingPlanBooking[]> {
    return await this.TrainingPlanBookingService.findTrainings(query);
  }

  @Get('/:bookingId')
  async findBookingById(
    @Param('bookingId') bookingId: string,
  ):Promise<TrainingPlanBooking>{
const booking = await this.TrainingPlanBookingService.findBookingById(bookingId)
return booking;

  }

  @Get('/:userId')
  async getTraining(
    @Param('userId') userId: string,
  ): Promise<TrainingPlanBooking[]> {
    const booking =await this.TrainingPlanBookingService.findByUserId(userId);
    if (!booking) {
      throw new NotFoundException('No Booking Found for this user!');
    }
    return booking;
  }

  @Post('/:TrainingPlanId')
  async create(
    @Req() req,
    @Param('TrainingPlanId') TrainingPlanId: string,
    @Body() createTrainingPlanBookingDto: CreateTrainingPlanBookingDto,
  ): Promise<TrainingPlanBooking> {
    const token = req.body.jwt;
    if (!token) {
      throw new HttpException('User Should be logged in', 401);
    }
    const decodedToken = await this.jwtService.decode(token) as { userId: string };
    const userId = decodedToken.userId;
    return this.TrainingPlanBookingService.bookService(
      userId,
      TrainingPlanId,
      createTrainingPlanBookingDto,
    );
  }

  @Post('/assign/:bookingId')
  async assignTrainer(
    @Param('bookingId') bookingId: string,
    @Body() assignTrainerDto: AssignTrainerDto,
  ) {
    return await this.TrainingPlanBookingService.assignTrainer(
      bookingId,
      assignTrainerDto,
    );
  }

  @Post(':BookingId/rate')
  async rateVet(
    @Req() req,
    @Param('BookingId') BookingId: string,
    @Body() rateDto: RateDto,
  ): Promise<TrainingPlanBooking> {
    const token = req.cookies?.jwt;
    if (!token) {
      throw new NotFoundException('User should be logged in!');
    }
    const decodedToken = await this.jwtService.decode(token) as { userId: string };
    const userId = decodedToken.userId;
    return this.TrainingPlanBookingService.addRating(
      userId,
      BookingId,
      rateDto.rating,
    );
  }

  @Patch('/:id/complete')
  async markTrainingAsComplete(@Param('id') id: string){
    return this.TrainingPlanBookingService.markTrainingAsComplete(id);
  }
}
