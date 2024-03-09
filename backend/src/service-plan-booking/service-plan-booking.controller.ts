import { Body, Controller, NotFoundException, Param, Post, Req } from '@nestjs/common';
import { ServicePlanBookingService } from './service-plan-booking.service';
import { JwtService } from '@nestjs/jwt';
import { ServicePlanBooking } from './schemas/service-plan-booking.schema';
import { AssignVetDto, CreateServicePlanBookingDto, RateDto } from './dto/service-booking-plan.dto';

@Controller('serviceBooking')
export class ServicePlanBookingController {
    constructor(
        private readonly servicePlanBookingService: ServicePlanBookingService,
        private jwtService: JwtService
    ){}


    @Post('/:servicePlanId')
    async create(
        @Req() req,
        @Param('servicePlanId') servicePlanId : string,
        @Body() createServicePlanBookingDto:CreateServicePlanBookingDto
    ):Promise<ServicePlanBooking>{
        const token = req.cookies.jwt;
        if(!token){
            throw new NotFoundException("User Should be logged in")
        }
        const decodedToken = this.jwtService.decode(token) as {userId: string};
        const userId = decodedToken.userId;
        return this.servicePlanBookingService.bookService(
            userId,
            servicePlanId,
            createServicePlanBookingDto
        );
    }

    @Post('/assign/:bookingId')
    async assignVet( 
        @Param('bookingId') bookingId: string,
        @Body() assignVetDto: AssignVetDto
    ){

        return this.servicePlanBookingService.assignVet(bookingId,assignVetDto);
    }

     @Post(':ServicePlanId/rate')
    async rateVet(
      @Req() req,
      @Param('ServicePlanId') ServicePlanId: string,
      @Body() rateDto: RateDto,
    ): Promise<ServicePlanBooking> {
      const token = req.cookies?.jwt;
      if (!token) {
        throw new NotFoundException('User should be logged in!');
      }
      const decodedToken = this.jwtService.decode(token) as { userId: string };
      const userId = decodedToken.userId;
      return this.servicePlanBookingService.addRating(userId, ServicePlanId, rateDto.rating);
    }
}

