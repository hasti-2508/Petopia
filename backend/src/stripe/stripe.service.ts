import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import Stripe from 'stripe';
import { TrainingPlanBooking } from 'src/training-plan-booking/schemas/training-plan-booking.schema';
import { ServicePlanBooking } from 'src/service-plan-booking/schemas/service-plan-booking.schema';
import { User } from 'src/user/schemas/user.schema';
import * as nodemailer from 'nodemailer';

@Injectable()
export class StripeService {
  private stripe;
  constructor(
    @InjectModel(ServicePlanBooking.name)
    private servicePlanBookingModel: mongoose.Model<ServicePlanBooking>,
    @InjectModel(TrainingPlanBooking.name)
    private TrainingPlanBookingModel: mongoose.Model<TrainingPlanBooking>,
    @InjectModel(User.name)
    private UserModel: mongoose.Model<User>,
  ) {
    this.stripe = new Stripe(
      process.env.STRIPE_SECRET_KEY,
      {
        apiVersion: '2023-10-16',
      },
    );
  }


  async checkoutForBooking(id: string) {
    const isValid = await mongoose.Types.ObjectId.isValid(id);

    if (!isValid) {
      throw new HttpException('Invalid ID', 400);
    }
    let booking;
const service = await this.servicePlanBookingModel.findOne({ _id: id });
const training = await this.TrainingPlanBookingModel.findOne({ _id: id });

if(service){
   booking = service;
}else if(training){
  booking = training;
}
else{
  throw new NotFoundException('Booking Not found')
}
      const total = booking.totalPrice;
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: `http://localhost:3000/success?id=${booking.id}`,
        cancel_url: `http://localhost:3000/PetService`,
        customer_email: booking.email,
        client_reference_id: booking.userId,
        mode: 'payment',
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'booking on petopia',
              },
              unit_amount: total * 100,
            },
            quantity: 1,
          },
        ],
      });
      return session;
  }

  async confirmationOfPayment(id: string) {
    const service = await this.servicePlanBookingModel.findById(id);
    const training = await this.TrainingPlanBookingModel.findById(id);
    if (service) {
      service.isConfirmed = !service.isConfirmed;
      service.save();
      const user = await this.UserModel.findById(service.userId);
      if (user) {
        await this.sendEmail(user);
      }
    }

    if (training) {
      training.isConfirmed = !training.isConfirmed;
      training.save();
      const user = await this.UserModel.findById(training.userId);
      if (user) {
        await this.sendEmail(user);
      }
    }
  }

  async sendEmail(user: User): Promise<void> {
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
      subject: 'Booking Confirmation',
      text: `Hello User, 
      You requested a Booking for our service.
      You have completed the Payment successfully.
      we will be there on the time to fulfill your need.
      Do not forget to rate our service`,
    };

    await transporter.sendMail(mailOptions);
  }
}
