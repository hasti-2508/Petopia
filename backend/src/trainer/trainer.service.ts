import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Trainer } from './schemas/trainer.schema';
import { CreateTrainerDto } from './dto/trainer.dto';
import { TrainingPlanBooking } from 'src/training-plan-booking/schemas/training-plan-booking.schema';
import { Query } from 'express-serve-static-core';

@Injectable()
export class TrainerService {
  constructor(
    @InjectModel(Trainer.name)
    private TrainerModel: mongoose.Model<Trainer>,
    @InjectModel(TrainingPlanBooking.name)
    private TrainingPlanBookingModel: mongoose.Model<TrainingPlanBooking>,
  ) {}

  async findTrainer(qu: Query): Promise<Trainer[]> {
    let query = this.TrainerModel.find({ isActive: true });
    const resPerPage = 9;
    const currentPage = Number(qu.page) || 1;
    const skip = resPerPage * (currentPage - 1);
    return query.limit(resPerPage).skip(skip).exec();
  }
  async register(createTrainerDto: CreateTrainerDto): Promise<Trainer> {
    const newTrainer = await this.TrainerModel.create({ ...createTrainerDto });
    return newTrainer;
  }
  async findByEmail(email: string): Promise<Trainer> {
    const trainer = await this.TrainerModel.findOne({ email, isActive: true });
    if (!trainer) {
      throw new NotFoundException('Trainer not found');
    }
    return trainer;
  }
  async findByWithEmail(email: string): Promise<Trainer> {
    const trainer = await this.TrainerModel.findOne({ email, isActive: true });
    return trainer;
  }

  async findTrainerById(id: string): Promise<Trainer> {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('Invalid ID', 400);
    }
    const trainer = await this.TrainerModel.findOne({
      _id: id,
      isActive: true,
    });
    if (!trainer) {
      throw new NotFoundException('Trainer not found');
    }
    return trainer;
  }

  async updateTrainer(id: string, fieldToUpdate: any): Promise<Trainer> {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('Invalid Id', 400);
    }
    const updatedTrainer = await this.TrainerModel.findByIdAndUpdate(
      id,
      fieldToUpdate,
      { new: true },
    );
    if (!updatedTrainer) {
      throw new NotFoundException('Trainer not found');
    }
    return updatedTrainer;
  }

  async deleteTrainer(id: string) {
    const trainer = await this.findTrainerById(id);
    trainer.isActive = false;
    trainer.save();
  }

  async confirm(bookingId: string, trainerId): Promise<TrainingPlanBooking> {
    const isValidBookingId = mongoose.Types.ObjectId.isValid(bookingId);
    if (!isValidBookingId) {
      throw new HttpException('Invalid Booking ID', 400);
    }
    const booking = await this.TrainingPlanBookingModel.findById(bookingId);
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    booking.isCompleted = true;
    const trainer = await this.TrainerModel.findById(trainerId);
    if (!trainer) {
      throw new NotFoundException('Trainer not found.');
    }
    trainer.bookingHistory.push(booking._id);
    trainer.bookings = trainer.bookings.filter(
      (booking) => booking.toString() !== booking._id,
    );
    trainer.save();
    return booking.save();
  }
}
