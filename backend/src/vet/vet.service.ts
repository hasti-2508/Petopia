
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CreateVetDto } from 'src/vet/dto/vet.dto';
import { Vet } from 'src/vet/schemas/vet.schema';



@Injectable()
export class VetService {

constructor(
    @InjectModel(Vet.name)
    private VetModel: mongoose.Model<Vet>,
  ) {}

  async findVet(){
    return this.VetModel.find({isActive: true}).exec();
  }
  async register(createVetDto: CreateVetDto): Promise<Vet> {
    const newVet = await this.VetModel.create(createVetDto);
    return newVet;
  }
  async findByEmail(email: string): Promise<Vet>{
    const vet = await this.VetModel.findOne({email, isActive: true});
    if (!vet) {
      throw new NotFoundException('Vet not found');
    }
    return vet;
  }
  async findByWithEmail(email: string): Promise<Vet>{
    const vet = await this.VetModel.findOne({email, isActive: true});
    return vet;
  }

  async findVetById(id: string){
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('Invalid ID', 400);
    }

    const vet = await this.VetModel.findOne({ _id: id,isActive:true});
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

  async deleteTrainer(id:string){
    const vet = await this.findVetById(id);
    vet.isActive = false;
    vet.save()
  }

  async uploadUserPictureUrl(id: string, imageUrl: string): Promise<Vet> {
    const vet = await this.VetModel.findById(id).exec();
    if (!vet ) {
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

}
