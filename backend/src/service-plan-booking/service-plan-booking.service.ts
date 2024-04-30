import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ServicePlanBooking } from './schemas/service-plan-booking.schema';
import mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';
import { User } from 'src/user/schemas/user.schema';
import { ServicePlan } from 'src/service-plan/schemas/service-plan.schema';
import { Vet } from 'src/vet/schemas/vet.schema';
import {
  AssignVetDto,
  CreateServicePlanBookingDto,
} from './dto/service-booking-plan.dto';
import * as nodemailer from 'nodemailer';

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

  async findBookings(qu: Query): Promise<ServicePlanBooking[]> {
    const resPerPage = 10;
    const currentPage = Number(qu.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    return this.servicePlanBookingModel
      .find()
      .sort({ createdAt: -1 })
      .limit(resPerPage)
      .skip(skip)
      .exec();
  }
  async findBookingById(bookingId: string): Promise<ServicePlanBooking> {
    return await this.servicePlanBookingModel.findById(bookingId);
  }

  async findByUserId(userId: string): Promise<ServicePlanBooking[]> {
    const booking = await this.servicePlanBookingModel.find({ userId: userId });
    return booking;
  }

  async bookService(
    userId: string,
    servicePlanId: string,
    createServicePlanBookingDto: CreateServicePlanBookingDto,
  ): Promise<ServicePlanBooking> {
    const vet = await this.VetModel.findOne({
      city: createServicePlanBookingDto.city,
    });
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
    return createdBooking;
  }
  async assignVet(
    bookingId: string,
    assignVetDto: AssignVetDto,
  ): Promise<ServicePlanBooking> {
    const vetId = new mongoose.Types.ObjectId(assignVetDto.vetId);
    const isValidBookingId = mongoose.Types.ObjectId.isValid(bookingId);
    if (!isValidBookingId) {
      throw new HttpException('Invalid Booking ID', 400);
    }

    const booking = await this.servicePlanBookingModel.findById(bookingId);
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    const vet = await this.VetModel.findById({ _id: vetId, isAvailable: true });
    if (!vet) {
      throw new NotFoundException('Vet not found');
    }
    if (booking.isCancelled === true) {
      throw new HttpException('This booking is cancelled', 409);
    }
    if (booking.isConfirmed === false) {
      throw new HttpException('This booking is not confirmed yet', 409);
    }
    if (booking.city !== vet.city) {
      throw new HttpException('The Vet is from different city!', 402);
    }
    booking.vetId = vet._id;
    vet.bookings.push(booking._id);
    vet.save();
    const vetToMail = await this.VetModel.findById(booking.vetId);
    if (vetToMail) {
      await this.sendBookingEmail(vetToMail);
    }
    return booking.save();
  }

  async sendBookingEmail(vet: Vet): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS_KEY,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: 'Assigned Booking',
      text: `Hello Vet, 
    You have assigned a service.
    Please, find the details and complete it on the time.`,
    };

    await transporter.sendMail(mailOptions);
  }

  async addRating(
    userId: string,
    bookingId: string,
    rating: number,
  ): Promise<ServicePlanBooking> {
    if (!userId) {
      throw new NotFoundException('User Not Found');
    }
    const isValid = mongoose.Types.ObjectId.isValid(bookingId);
    if (!isValid) {
      throw new HttpException('Invalid ID', 400);
    }
    const booking = await this.servicePlanBookingModel.findById(bookingId);

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    if (booking.isCompleted === false) {
      throw new HttpException("This booking isn't fulfilled yet!", 409);
    }
    const existingRating = booking.ratings.find((r) => r.userId === userId);
    if (existingRating) {
      throw new HttpException(
        'You have already rated this Service booking.',
        409,
      );
    }
    const servicePlanID = booking.servicePlanId;

    booking.ratings.push({
      rating,
      userId,
      servicePlanID,
    });
    const averageRating =
      booking.ratings.reduce((acc, curr) => acc + curr.rating, 0) /
      booking.ratings.length;
    booking.averageRating = Number(averageRating.toFixed(1));
    const isValidPlanId = mongoose.Types.ObjectId.isValid(servicePlanID);
    if (!isValidPlanId) {
      throw new HttpException('Invalid ID', 400);
    }

    const plan = await this.servicePlanModel.findById(servicePlanID).exec();
    if (!plan) {
      throw new NotFoundException('This service does not exist!');
    }
    plan.average_rating = Number(booking.averageRating.toFixed(1));
    plan.save();
    return booking.save();
  }

  async markBookingAsComplete(id: string): Promise<ServicePlanBooking> {
    const booking = await this.servicePlanBookingModel.findById(id);
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    if (booking) {
      booking.isCompleted = true;
      return booking.save();
    } else {
      throw new Error('Booking not found');
    }
  }
}
