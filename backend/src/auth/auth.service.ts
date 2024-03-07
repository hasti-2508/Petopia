import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { mongo } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { LoginDto } from './dto/auth.dto';
import { Trainer } from 'src/trainer/schemas/trainer.schema';
// import { Twilio } from 'twilio';


@Injectable()
export class AuthService {

constructor(
    @InjectModel(User.name)
    private UserModel: mongoose.Model<User>,
    @InjectModel(Trainer.name)
    private TrainerModel: mongoose.Model<Trainer>
  ) {}

 
  async findByEmailInUser(email: string): Promise<User>{
    const user = await this.UserModel.findOne({email, isActive: true});
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  async findByEmailInTrainer(email: string): Promise<Trainer>{
    const user = await this.TrainerModel.findOne({email, isActive: true});
    if (!user) {
      throw new NotFoundException('Trainer not found');
    }
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
