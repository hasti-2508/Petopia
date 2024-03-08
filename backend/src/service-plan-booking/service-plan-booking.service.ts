import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ServicePlanBooking } from './schemas/service-plan-booking.schema';
import mongoose from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { ServicePlan } from 'src/service-plan/schemas/service-plan.schema';
import { Vet } from 'src/vet/schemas/vet.schema';
import { AssignVetDto, CreateServicePlanBookingDto } from './dto/service-booking-plan.dto';
import { retryWhen } from 'rxjs';

@Injectable()
export class ServicePlanBookingService {
  constructor(
    @InjectModel(ServicePlanBooking.name)
    private servicePlanBookingModel: mongoose.Model<ServicePlanBooking>,
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    @InjectModel(ServicePlan.name)
    private servicePlanModel: mongoose.Model<ServicePlan>,
    @InjectModel(Vet.name)
    private VetModel: mongoose.Model<Vet>,
  ) {}

  async bookService(
    userId: string,
    servicePlanId: string,
    createServicePlanBookingDto: CreateServicePlanBookingDto,
  ) :Promise<ServicePlanBooking> {
    const vet = await this.VetModel.findOne({ city: createServicePlanBookingDto.city });
    if (!vet) {
      throw new ConflictException('We are not providing service in this city!');
    }
    
    const isValid = mongoose.Types.ObjectId.isValid(servicePlanId);
    if (!isValid) {
      throw new HttpException('Invalid ID', 400);
    }

    const plan = await this.servicePlanModel.findById(servicePlanId).exec();
    if (!plan) {
      throw new NotFoundException('This service does not exist!');
    }

    const totalPrice = plan.price;
    const booking = {
      ...createServicePlanBookingDto,
      userId,
      servicePlanId,
      totalPrice: totalPrice,
    };

    const createdBooking = await this.servicePlanBookingModel.create(booking);
    return createdBooking.save();
  }

  async assignVet(bookingId: string, assignVetDto: AssignVetDto) {


    const vet_Id = assignVetDto.vetId;
    const isValidBookingId = mongoose.Types.ObjectId.isValid(bookingId);
    if (!isValidBookingId) {
        throw new HttpException('Invalid Booking ID', 400);
    }

    const booking = await this.servicePlanBookingModel.findById(bookingId);
    if (!booking) {
        throw new NotFoundException("Booking not found");
    }
    if (booking.isCancelled === true) {
        throw new ConflictException("This booking is cancelled");
    }
    if (booking.isConfirmed === false) {
        throw new ConflictException("This booking is not confirmed yet");
    }

    const vet = await this.VetModel.findOne({ vetId: vet_Id });
    if (!vet) {
        throw new NotFoundException("Vet not found");
    }

    booking.vetId = vet_Id;
    return booking.save();
}

}
