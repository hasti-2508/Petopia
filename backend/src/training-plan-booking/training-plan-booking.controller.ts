import {
    BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpException,
  NotFoundException,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TrainingPlanBookingService } from './training-plan-booking.service';
import {
  AssignTrainerDto,
  CreateTrainingPlanBookingDto,
  RateDto,
} from './dto/training-plan-booking.dto';
import { TrainingPlanBooking } from './schemas/training-plan-booking.schema';

@Controller('trainingBooking')
export class TrainingPlanBookingController {
  constructor(
    private readonly TrainingPlanBookingService: TrainingPlanBookingService,
    private jwtService: JwtService,
  ) {}

  @Post('/:TrainingPlanId')
  async create(
      @Req() req,
      @Param('TrainingPlanId') TrainingPlanId : string,
      @Body() createTrainingPlanBookingDto:CreateTrainingPlanBookingDto
  ):Promise<TrainingPlanBooking>{
      const token = req.body.jwt;
      if(!token){
          throw new HttpException("User Should be logged in",401)
      }
      const decodedToken = this.jwtService.decode(token) as {userId: string};
      const userId = decodedToken.userId;
    return this.TrainingPlanBookingService.bookService(
          userId,
          TrainingPlanId,
          createTrainingPlanBookingDto
      );
  }

  @Post('/assign/:bookingId')
  async assignTrainer(
    @Param('bookingId') bookingId: string,
    @Body() assignTrainerDto: AssignTrainerDto,
  ) {
    return this.TrainingPlanBookingService.assignTrainer(
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
    const decodedToken = this.jwtService.decode(token) as { userId: string };
    const userId = decodedToken.userId;
    return this.TrainingPlanBookingService.addRating(
      userId,
      BookingId,
      rateDto.rating,
    );
  }
}
