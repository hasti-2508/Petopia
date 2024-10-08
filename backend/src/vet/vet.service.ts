import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ServicePlanBooking } from 'src/service-plan-booking/schemas/service-plan-booking.schema';
import { CreateVetDto } from 'src/vet/dto/vet.dto';
import { Vet } from 'src/vet/schemas/vet.schema';
import * as nodemailer from 'nodemailer';
import { Query } from 'express-serve-static-core';

@Injectable()
export class VetService {
  constructor(
    @InjectModel(Vet.name)
    private VetModel: mongoose.Model<Vet>,
    @InjectModel(ServicePlanBooking.name)
    private servicePlanBookingModel: mongoose.Model<ServicePlanBooking>,
  ) {}

  async findVet(qu: Query): Promise<Vet[]> {
    let query = this.VetModel.find({ isActive: true });
    const resPerPage = 9;
    const currentPage = Number(qu.page) || 1;
    const skip = resPerPage * (currentPage - 1);
    return query.limit(resPerPage).skip(skip).exec();
  }

  async findAvailableVet(): Promise<Vet[]> {
    return await this.VetModel.find({ isActive: true, isAvailable: true });
  }
  async register(createVetDto: CreateVetDto): Promise<Vet> {
    const newVet = await this.VetModel.create({ ...createVetDto });
    return newVet;
  }
  async findByEmail(email: string): Promise<Vet> {
    const vet = await this.VetModel.findOne({ email, isActive: true });
    if (!vet) {
      throw new NotFoundException('Vet not found');
    }
    return vet;
  }

  async findVetById(id: string): Promise<Vet> {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('Invalid ID', 400);
    }
    const vet = await this.VetModel.findOne({ _id: id, isActive: true });
    if (!vet) {
      throw new NotFoundException('Vet not found');
    }
    return vet;
  }

  async updateVet(id: string, fieldsToUpdate: any): Promise<Vet> {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('Invalid Id', 400);
    }

    const updateObj: any = {};
    for (const key in fieldsToUpdate) {
      if (fieldsToUpdate.hasOwnProperty(key)) {
        updateObj[key] = fieldsToUpdate[key];
      }
    }

    const updatedVet = await this.VetModel.findByIdAndUpdate(
      id,
      { $set: updateObj },
      { new: true },
    );

    if (!updatedVet) {
      throw new NotFoundException('Vet not found');
    }

    return updatedVet;
  }

  async deleteTrainer(id: string) {
    const vet = await this.findVetById(id);
    vet.isActive = false;
    vet.save();
  }

  async confirm(bookingId: string, vetId) {
    const isValidBookingId = mongoose.Types.ObjectId.isValid(bookingId);
    if (!isValidBookingId) {
      throw new HttpException('Invalid Booking ID', 400);
    }

    const booking = await this.servicePlanBookingModel.findById(bookingId);
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    booking.isCompleted = true;
    const vet = await this.VetModel.findById(vetId);
    if (!vet) {
      throw new NotFoundException('Vet not found.');
    }
    vet.bookingHistory.push(booking._id);
    vet.bookings = vet.bookings.filter(
      (booking) => booking.toString() !== booking._id,
    );
    vet.save();
    return booking.save();
  }

  async markIsAvailable(id: string) {
    const vet = await this.VetModel.findOne({ _id: id });
    if (!vet) {
      throw new NotFoundException('Vet not found');
    }
    if (vet) {
      vet.isAvailable = !vet.isAvailable;
      return vet.save();
    } else {
      throw new Error('Vet not found');
    }
  }

  async notifyVet(id: string) {
    const vet = await this.VetModel.findOne({ _id: id });
    if (!vet) {
      throw new NotFoundException('Vet Not Found!');
    }
    if (vet) {
      vet.isHavingCall = !vet.isHavingCall;
      if (vet) {
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
          subject: 'Emergency call',
          text: `Hello Vet, 
       You are having a emergency call right now.
       Please join the link attached
       Link : http://localhost:3000/room?roomId=${id}`,
        };

        await transporter.sendMail(mailOptions);
      }
      return vet.save();
    } else {
      throw new Error('Vet not found');
    }
  }

}
