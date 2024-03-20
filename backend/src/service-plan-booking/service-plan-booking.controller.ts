import { Body, Controller, Get, HttpException, NotFoundException, Param, Post, Req, Res } from '@nestjs/common';
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
    
    @Get('/:userId')
    async getService(
      @Param('userId') userId: string
    ):Promise<ServicePlanBooking[]>{
      const booking =  await this.servicePlanBookingService.findByUserId(userId);
      if(!booking){
        throw new NotFoundException("No Booking Found for this user!")
      }
      return booking;
      
        }

    @Post('/:servicePlanId')
    async create(
        @Req() req,
        @Res() res,
        @Param('servicePlanId') servicePlanId : string,
        @Body() createServicePlanBookingDto:CreateServicePlanBookingDto
    ):Promise<ServicePlanBooking>{
        const token = req.body.jwt;
      try{
        if(!token){
            throw new HttpException("User Should be logged in",401)
        }
        const decodedToken = this.jwtService.decode(token) as {userId: string};
        const userId = decodedToken.userId;
        const booking = this.servicePlanBookingService.bookService(
            userId,
            servicePlanId,
            createServicePlanBookingDto
        );
        return res.json({
          booking,
        })
      }
      catch(error){
        if (error instanceof HttpException) {
            res.status(401).json({ error: error.message });
          } else {
            console.error('Error:', error.message);
            // res.status(500).json({ error: 'Internal Server Error' });
          }
      }
    }

    @Post('/assign/:bookingId')
    async assignVet( 
        @Param('bookingId') bookingId: string,
        @Body() assignVetDto: AssignVetDto
    ){

        return this.servicePlanBookingService.assignVet(bookingId,assignVetDto);
    }

     @Post(':BookingId/rate')
    async rateVet(
      @Req() req,
      @Param('BookingId') BookingId: string,
      @Body() rateDto: RateDto,
    ): Promise<ServicePlanBooking> {
      const token = req.cookies?.jwt;
      if (!token) {
        throw new NotFoundException('User should be logged in!');
      }
      const decodedToken = this.jwtService.decode(token) as { userId: string };
      const userId = decodedToken.userId;
      return this.servicePlanBookingService.addRating(userId, BookingId, rateDto.rating);
    }

    // @Post(':BookingId/ratePlan')
    // async ratePlan(
    //   @Req() req,
    //   @Param('ServicePlanId') ServicePlanId: string,
    //   @Body() rateDto: RateDto,
    // ): Promise<ServicePlanBooking> {
    //   const token = req.cookies?.jwt;
    //   if (!token) {
    //     throw new NotFoundException('User should be logged in!');
    //   }
    //   const decodedToken = this.jwtService.decode(token) as { userId: string };
    //   const userId = decodedToken.userId;
    //   return this.servicePlanBookingService.addRating(userId, ServicePlanId, rateDto.rating);
    // }
}

