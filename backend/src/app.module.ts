import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetModule } from './pet/pet.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CloudinaryService } from './cloudinary/cloudinary.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONOGO_URI),
    PetModule],
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
