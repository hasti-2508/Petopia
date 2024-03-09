import { Body, Controller, NotFoundException, Param, Post, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TrainingPlanBookingService } from './training-plan-booking.service';
import { AssignTrainerDto, CreateTrainingPlanBookingDto } from './dto/training-plan-booking.dto';
import { TrainingPlanBooking } from './schemas/training-plan-booking.schema';

@Controller('trainingBooking')
export class TrainingPlanBookingController {
    constructor(
        private readonly TrainingPlanBookingService: TrainingPlanBookingService,
        private jwtService: JwtService
    ){}


    @Post('/:TrainingPlanId')
    async create(
        @Req() req,
        @Param('TrainingPlanId') TrainingPlanId : string,
        @Body() createTrainingPlanBookingDto:CreateTrainingPlanBookingDto
    ):Promise<TrainingPlanBooking>{
        const token = req.cookies.jwt;
        if(!token){
            throw new NotFoundException("User Should be logged in")
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
        @Body() assignTrainerDto: AssignTrainerDto
    ){

        return this.TrainingPlanBookingService.assignTrainer(bookingId,assignTrainerDto);
    }

}

