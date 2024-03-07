
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Trainer } from './schemas/trainer.schema';
import { CreateTrainerDto } from './dto/trainer.dto';



@Injectable()
export class TrainerService {

constructor(
    @InjectModel(Trainer.name)
    private TrainerModel: mongoose.Model<Trainer>,
  ) {}

  async findTrainer(){
    return this.TrainerModel.find({isActive: true}).exec();
  }
  async register(createTrainerDto: CreateTrainerDto): Promise<Trainer> {
    const newTrainer = await this.TrainerModel.create(createTrainerDto);
    return newTrainer;
  }
  async findByEmail(email: string): Promise<Trainer>{
    const trainer = await this.TrainerModel.findOne({email, isActive: true});
    if (!trainer) {
      throw new NotFoundException('Trainer not found');
    }
    return trainer;
  }
  async findByWithEmail(email: string): Promise<Trainer>{
    const trainer = await this.TrainerModel.findOne({email, isActive: true});
    return trainer;
  }

  async findTrainerById(id: string){
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('Invalid ID', 400);
    }

    const trainer = await this.TrainerModel.findOne({ _id: id,isActive:true});
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

  async deleteTrainer(id:string){
    const trainer = await this.findTrainerById(id);
    trainer.isActive = false;
    trainer.save()
  }

  async uploadUserPictureUrl(id: string, imageUrl: string): Promise<Trainer> {
    const trainer = await this.TrainerModel.findById(id).exec();
    if (!trainer ) {
      throw new Error('User not found');
    }
    if (trainer.imageUrl) {
        trainer.imageHistory = [trainer.imageUrl, ...(trainer.imageHistory || [])];
    }

    trainer.imageUrl = imageUrl;
    return trainer.save();
  }

  async deleteUserPictureUrl(id: string): Promise<Trainer> {
    const trainer = await this.findTrainerById(id);
    if (!trainer.imageUrl) {
      throw new NotFoundException('Picture not found for the Trainer');
    }
    if (!trainer.imageHistory) {
        trainer.imageHistory = [];
    }
    trainer.imageHistory.unshift(trainer.imageUrl); 
    trainer.imageUrl = ''; 
    const updatedTrainer = await trainer.save(); 
    return updatedTrainer;
  }

}
