import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetModule } from './pet/pet.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TrainerModule } from './trainer/trainer.module';
import { VetModule } from './vet/vet.module';
import { ServicePlanModule } from './service-plan/service-plan.module';
import { TrainingPlanModule } from './training-plan/training-plan.module';
import { ServicePlanBookingModule } from './service-plan-booking/service-plan-booking.module';
import { TrainingPlanBookingModule } from './training-plan-booking/training-plan-booking.module';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONOGO_URI),
    PetModule,
    AuthModule,
    UserModule,
    VetModule,
    TrainerModule,
    ServicePlanModule,
    TrainingPlanModule,
    ServicePlanBookingModule,
    TrainingPlanBookingModule,
    StripeModule,
  ],
  controllers: [AppController],
  providers: [AppService,CloudinaryService],
})
export class AppModule {
  async onModuleInit(){
    try{
      await mongoose.connection;
      console.log("Database connected Successfully")
    }
    catch(error){
      console.error("Database connection error:",error)
    }
  }
}
