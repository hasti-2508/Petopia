import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { Trainer } from 'src/trainer/schemas/trainer.schema';
import { Vet } from 'src/vet/schemas/vet.schema';
import * as nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private UserModel: mongoose.Model<User>,
    @InjectModel(Trainer.name)
    private TrainerModel: mongoose.Model<Trainer>,
    @InjectModel(Vet.name)
    private VetModel: mongoose.Model<Vet>,
  ) {}

  async findByEmailInUser(email: string): Promise<User | Trainer | Vet> {
    let user;
    user = await this.UserModel.findOne({ email, isActive: true });
    if (user) {
      return user;
    }
    user = await this.TrainerModel.findOne({ email, isActive: true });
    if (user) {
      return user;
    }
    user = await this.VetModel.findOne({ email, isActive: true });
    if (user) {
      return user;
    }
    throw new NotFoundException('User not found');
  }

  async findUserById(id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('Invalid ID', 400);
    }
    const user = await this.UserModel.findOne({ _id: id, isActive: true });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async sendPasswordResetEmail(user: User): Promise<void> {
    const token = uuidv4();
    user.resetToken = token;
    user.resetTokenExpiration = new Date(Date.now() + 3600000);
    await user.save();
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
      subject: 'Password Reset Request',
      text: `Hello, 
      You requested a password reset. Please use the following token to reset your password: ${token}`,
    };

    await transporter.sendMail(mailOptions);
  }
}
