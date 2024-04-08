import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ServicePlanBooking } from 'src/service-plan-booking/schemas/service-plan-booking.schema';
import { CreateVetDto } from 'src/vet/dto/vet.dto';
import { Vet } from 'src/vet/schemas/vet.schema';
import * as nodemailer from 'nodemailer';

@Injectable()
export class VetService {
  constructor(
    @InjectModel(Vet.name)
    private VetModel: mongoose.Model<Vet>,
    @InjectModel(ServicePlanBooking.name)
    private servicePlanBookingModel: mongoose.Model<ServicePlanBooking>,
  ) {}

  async findVet(): Promise<Vet[]> {
    return await this.VetModel.find({ isActive: true }).exec();
  }

  async findAvailableVet(): Promise<Vet[]>{
    return await this.VetModel.find({isActive: true, isAvailable: true});
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
  async findByWithEmail(email: string): Promise<Vet> {
    const vet = await this.VetModel.findOne({ email, isActive: true });
    return vet;
  }

  async findVetById(id: string) {
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

  async updateTrainer(id: string, fieldToUpdate: any): Promise<Vet> {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('Invalid Id', 400);
    }

    const updatedVet = await this.VetModel.findByIdAndUpdate(
      id,
      fieldToUpdate,
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

  async uploadUserPictureUrl(id: string, imageUrl: string): Promise<Vet> {
    const vet = await this.VetModel.findById(id).exec();
    if (!vet) {
      throw new Error('User not found');
    }
    if (vet.imageUrl) {
      vet.imageHistory = [vet.imageUrl, ...(vet.imageHistory || [])];
    }

    vet.imageUrl = imageUrl;
    return vet.save();
  }

  async deleteUserPictureUrl(id: string): Promise<Vet> {
    const vet = await this.findVetById(id);
    if (!vet.imageUrl) {
      throw new NotFoundException('Picture not found for the Vet');
    }
    if (!vet.imageHistory) {
      vet.imageHistory = [];
    }
    vet.imageHistory.unshift(vet.imageUrl);
    vet.imageUrl = '';
    const updatedVet = await vet.save();
    return updatedVet;
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

  async markIsAvailable(id: string){
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

  async notifyVet(roomId : string){
    const vet = await this.VetModel.findOne({_id: roomId})
    if(!vet){
      throw new NotFoundException("Vet Not Found!")
    }
    if(vet){
 
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
       You are having a video call right now.
       Please join the link attached
       Link : http://localhost:3000/room?roomId=${roomId}`,
        };
    
        await transporter.sendMail(mailOptions);
    }
  }
}
