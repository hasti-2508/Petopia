import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { TrainingPlanBooking } from './schemas/training-plan-booking.schema';
import { TrainingPlan } from 'src/training-plan/schemas/training-plan.schema';
import { Trainer } from 'src/trainer/schemas/trainer.schema';
import {
  AssignTrainerDto,
  CreateTrainingPlanBookingDto,
} from './dto/training-plan-booking.dto';
import * as nodemailer from 'nodemailer';
import { Query } from 'express-serve-static-core';

@Injectable()
export class TrainingPlanBookingService {
  constructor(
    @InjectModel(TrainingPlanBooking.name)
    private TrainingPlanBookingModel: mongoose.Model<TrainingPlanBooking>,
    @InjectModel(TrainingPlan.name)
    private TrainingPlanModel: mongoose.Model<TrainingPlan>,
    @InjectModel(Trainer.name)
    private TrainerModel: mongoose.Model<Trainer>,
  ) {}

  async findTrainings(qu: Query): Promise<TrainingPlanBooking[]> {
    const resPerPage = 10;
    const currentPage = Number(qu.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    return await this.TrainingPlanBookingModel.find()
    .sort({createdAt: -1})
      .limit(resPerPage)
      .skip(skip)
      .exec();
  }

  async findBookingById(bookingId: string): Promise<TrainingPlanBooking> {
    const booking =  await this.TrainingPlanBookingModel.findById(bookingId);
    return booking;
  }

  async findByUserId(userId: string): Promise<TrainingPlanBooking[]> {
    return await this.TrainingPlanBookingModel.find({ userId: userId });
  }

  async bookService(
    userId: string,
    TrainingPlanId: string,
    createTrainingPlanBookingDto: CreateTrainingPlanBookingDto,
  ): Promise<TrainingPlanBooking> {
    const requiredFields = [
      'user_name',
      'email',
      'phoneNo',
      'address',
      'city',
      'state',
    ];
    for (const field of requiredFields) {
      if (!createTrainingPlanBookingDto[field]) {
        throw new BadRequestException(`${field} is required`);
      }
    }
    const Trainer = await this.TrainerModel.findOne({
      city: createTrainingPlanBookingDto.city,
    });
    if (!Trainer) {
      throw new HttpException(
        'We are not providing service in this city!',
        409,
      );
    }

    const isValid = await mongoose.Types.ObjectId.isValid(TrainingPlanId);
    if (!isValid) {
      throw new HttpException('Invalid ID', 400);
    }
    const plan = await this.TrainingPlanModel.findById(TrainingPlanId).exec();
    if (!plan) {
      throw new NotFoundException('This service does not exist!');
    }
    const totalPrice = plan.price;
    const booking = {
      ...createTrainingPlanBookingDto,
      userId,
      TrainingPlanId,
      totalPrice: totalPrice,
    };
    const createdBooking = await this.TrainingPlanBookingModel.create(booking);
    return createdBooking.save();
  }
  async assignTrainer(bookingId: string, assignTrainerDto: AssignTrainerDto) {
    const trainerId = await new mongoose.Types.ObjectId(assignTrainerDto.trainerId);
    const isValidBookingId = await mongoose.Types.ObjectId.isValid(bookingId);
    if (!isValidBookingId) {
      throw new HttpException('Invalid Booking ID', 400);
    }

    const booking = await this.TrainingPlanBookingModel.findById(bookingId);
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    const Trainer = await this.TrainerModel.findOne({
      _id: trainerId,
      isAvailable: true,
    });
    if (!Trainer) {
      throw new NotFoundException('Trainer not found');
    }
    if (booking.isCancelled === true) {
      throw new HttpException('This booking is cancelled', 409);
    }
    if (booking.isConfirmed === false) {
      throw new HttpException('This booking is not confirmed yet', 409);
    }

    booking.trainerId = Trainer._id;
    Trainer.bookings.push(booking._id);
    Trainer.save();
    const trainerToMail = await this.TrainerModel.findById(booking.trainerId);
    if (trainerToMail) {
      await this.sendBookingEmail(trainerToMail);
    }
    return booking.save();
  }

  async sendBookingEmail(trainer: Trainer): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS_KEY,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: trainer.email,
      subject: 'Assigned Booking',
      text: `Hello Trainer, 
      You have assigned a training to fulfill.
      Please, find the details and complete it on the time.`,
    };

    await transporter.sendMail(mailOptions);
  }

  async addRating(
    userId: string,
    bookingId: string,
    rating: number,
  ): Promise<TrainingPlanBooking> {
    if (!userId) {
      throw new NotFoundException('User Not Found');
    }

    const isValid = mongoose.Types.ObjectId.isValid(bookingId);
    if (!isValid) {
      throw new HttpException('Invalid ID', 400);
    }
    const booking = await this.TrainingPlanBookingModel.findById(bookingId);

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    const existingRating = booking.ratings.find((r) => r.userId === userId);
    if (existingRating) {
      throw new HttpException(
        'You have already rated this Training booking.',
        400,
      );
    }

    const trainingPlanID = booking.TrainingPlanId;
    booking.ratings.push({
      rating,
      userId,
      trainingPlanID,
    });
    const averageRating =
      booking.ratings.reduce((acc, curr) => acc + curr.rating, 0) /
      booking.ratings.length;
    booking.averageRating = averageRating;

    const isValidPlanId = mongoose.Types.ObjectId.isValid(trainingPlanID);
    if (!isValidPlanId) {
      throw new HttpException('Invalid ID', 400);
    }

    const plan = await this.TrainingPlanModel.findById(trainingPlanID).exec();
    if (!plan) {
      throw new NotFoundException('This training does not exist!');
    }
    plan.average_rating = booking.averageRating;
    plan.save();
    return booking.save();
  }

  async markTrainingAsComplete(id: string):Promise<TrainingPlanBooking>{
    const training = await this.TrainingPlanBookingModel.findById(id);
    if(!training){
      throw new NotFoundException("Booking Not Found");
    }
    if(training){
      training.isCompleted = true;
      return training.save();
    }
    else{
      throw new Error('Booking Not Found')
    }
  }
}
