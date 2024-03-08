import {
    ConflictException,
    HttpException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import mongoose from 'mongoose';
  import { User } from 'src/user/schemas/user.schema';
import { TrainingPlanBooking } from './schemas/training-plan-booking.schema';
import { TrainingPlan } from 'src/training-plan/schemas/training-plan.schema';
import { Trainer } from 'src/trainer/schemas/trainer.schema';
import { AssignTrainerDto, CreateTrainingPlanBookingDto } from './dto/training-plan-booking.dto';


  
  @Injectable()
  export class TrainingPlanBookingService {
    constructor(
      @InjectModel(TrainingPlanBooking.name)
      private TrainingPlanBookingModel: mongoose.Model<TrainingPlanBooking>,
      @InjectModel(User.name)
      private userModel: mongoose.Model<User>,
      @InjectModel(TrainingPlan.name)
      private TrainingPlanModel: mongoose.Model<TrainingPlan>,
      @InjectModel(Trainer.name)
      private TrainerModel: mongoose.Model<Trainer>,
    ) {}
  
    async bookService(
      userId: string,
      TrainingPlanId: string,
      createTrainingPlanBookingDto: CreateTrainingPlanBookingDto,
    ) :Promise<TrainingPlanBooking> {
      const Trainer = await this.TrainerModel.findOne({ city: createTrainingPlanBookingDto.city });
      if (!Trainer) {
        throw new ConflictException('We are not providing service in this city!');
      }
      
      const isValid = mongoose.Types.ObjectId.isValid(TrainingPlanId);
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
  
  
      const Trainer_Id = assignTrainerDto.TrainerId;
      const isValidBookingId = mongoose.Types.ObjectId.isValid(bookingId);
      if (!isValidBookingId) {
          throw new HttpException('Invalid Booking ID', 400);
      }
  
      const booking = await this.TrainingPlanBookingModel.findById(bookingId);
      if (!booking) {
          throw new NotFoundException("Booking not found");
      }
      if (booking.isCancelled === true) {
          throw new ConflictException("This booking is cancelled");
      }
      if (booking.isConfirmed === false) {
          throw new ConflictException("This booking is not confirmed yet");
      }
  
      const Trainer = await this.TrainerModel.findOne({ trainerId: Trainer_Id });
      if (!Trainer) {
          throw new NotFoundException("Trainer not found");
      }
  
      booking.trainerId = Trainer_Id;
      return booking.save();
  }
  
  }
  