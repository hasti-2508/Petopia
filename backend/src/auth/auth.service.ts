import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CreateUserDto } from './dto/auth.user.dto';
import { User } from './schemas/auth.user.schema';

// import { Twilio } from 'twilio';


@Injectable()
export class AuthService {

constructor(
    @InjectModel(User.name)
    private UserModel: mongoose.Model<User>,
  ) {}

  async findUser(){
    return this.UserModel.find().exec();
  }
  async register(user: CreateUserDto): Promise<User> {
    const newUser = await this.UserModel.create(user);
    return newUser;
  }
  async findByEmail(email: string): Promise<User>{
    const user = await this.UserModel.findOne({email, isActive: true});
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  async findByWithEmail(email: string): Promise<User>{
    const user = await this.UserModel.findOne({email, isActive: true});
    return user;
  }

  async findUserById(id: string){
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('Invalid ID', 400);
    }

    const user = await this.UserModel.findOne({ _id: id,isActive:true});
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
  
  async updateUser(id: string, fieldToUpdate: any): Promise<User> {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('Invalid Id', 400);
    }

    const updatedUser = await this.UserModel.findByIdAndUpdate(
      id,
      { $set: fieldToUpdate },
      { new: true },
    );

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser;
  }

  async deleteUser(id:string){
    const user = await this.findUserById(id);
    user.isActive = false;
    user.save()
  }

  async uploadUserPictureUrl(id: string, imageUrl: string): Promise<User> {
    const user = await this.UserModel.findById(id).exec();
    if (!user ) {
      throw new Error('User not found');
    }
    if (user.imageUrl) {
      user.imageHistory = [user.imageUrl, ...(user.imageHistory || [])];
    }

    user.imageUrl = imageUrl;
    return user.save();
  }

  async deleteUserPictureUrl(id: string): Promise<User> {
    const user = await this.findUserById(id);
    if (!user.imageUrl) {
      throw new NotFoundException('Picture not found for the User');
    }
    if (!user.imageHistory) {
      user.imageHistory = [];
    }
    user.imageHistory.unshift(user.imageUrl); 
    user.imageUrl = ''; 
    const updatedUser = await user.save(); 
    return updatedUser;
  }


//   private twilioClient: Twilio;

//   constructor() {
//     this.twilioClient = new Twilio(
//       process.env.TWILIO_ACCOUNT_SID,
//       process.env.TWILIO_AUTH_TOKEN,
//     );
//   }

//   async sendOtp(phoneNumber: string) {
//     console.log(process.env.TWILIO_VERIFICATION_SERVICE_SID);
//     const serviceSid = process.env.TWILIO_VERIFICATION_SERVICE_SID;
//     console.log(serviceSid)
//     let msg = '';
//     await this.twilioClient.verify.v2
//       .services(serviceSid)
//       .verifications.create({ to: phoneNumber, channel: 'sms' })
//       .then((verification) => (msg = verification.status));
//     return { msg: msg };
//   }

//   async verifyOtp(phoneNumber: string, code: string) {
//     const serviceSid = process.env.TWILIO_VERIFICATION_SERVICE_SID;
//     let msg = '';
//     await this.twilioClient.verify.v2
//       .services(serviceSid)
//       .verificationChecks.create({ to: phoneNumber, code: code })
//       .then((verification) => (msg = verification.status));
//     return { msg: msg };
//   }

}
