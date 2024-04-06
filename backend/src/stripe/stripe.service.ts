import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
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
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    });
  }

  async checkoutForServiceBooking(servicePlanId: string) {
    const isValid = mongoose.Types.ObjectId.isValid(servicePlanId);
    if (!isValid) {
      throw new HttpException('Invalid ID', 400);
    }

    const bookings = await this.servicePlanBookingModel.find();
    if (!bookings) {
      throw new NotFoundException('booking not found');
    }

    const idToMatch = servicePlanId;

    const matchedData = bookings.filter((data) =>
      data._id.equals(new ObjectId(idToMatch)),
    );

    const booking = matchedData[0];
    const total = booking.totalPrice;

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: total * 100,
      currency: 'inr',
      payment_method_types: ['card'],
      //  success_url: redirectURL + '?status=success',
      // cancel_url: redirectURL + '?status=cancel'
    });

    if (paymentIntent.status === 'succeeded') {
      await this.servicePlanBookingModel.updateOne(
        { _id: servicePlanId },
        { isConfirmed: true },
      );

      const user = await this.UserModel.findById(booking.userId);
      if (user) {
        await this.sendEmail(user);
      }
    }
    return paymentIntent;
  }

  async checkoutForTrainingBooking(TrainingPlanId: string) {
    const isValid = mongoose.Types.ObjectId.isValid(TrainingPlanId);

    if (!isValid) {
      throw new HttpException('Invalid ID', 400);
    }

    const bookings = await this.servicePlanBookingModel.find();
    if (!bookings) {
      throw new NotFoundException('booking not found');
    }

    const idToMatch = TrainingPlanId;

    const matchedData = bookings.filter((data) =>
      data._id.equals(new ObjectId(idToMatch)),
    );

    const booking = matchedData[0];
    const total = booking.totalPrice;

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: total * 100,
      currency: 'inr',
      payment_method_types: ['card'],
    });

    if (paymentIntent.status === 'succeeded') {
      await this.TrainingPlanBookingModel.updateOne(
        { _id: TrainingPlanId },
        { isConfirmed: true },
      );
      const user = await this.UserModel.findById(booking.userId);
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
      to: user.email,
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
