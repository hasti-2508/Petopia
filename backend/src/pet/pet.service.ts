import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { PetDto } from './dto/pet.dto';
import { Pet } from './schemas/pet.schema';

@Injectable()
export class PetService {
    constructor(
        @InjectModel(Pet.name)
        private petModel: mongoose.Model<Pet>
    ){}

    async findPet():Promise<Pet[]>{
        return this.petModel.find({ isActive: true });
    }

    async createPet( petDto : PetDto): Promise<Pet>{
        return this.petModel.create({...petDto});
   }

   async findPetById(id: string){
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('Invalid ID', 400);
    }

    const pet = await this.petModel.findOne({ _id: id,isActive:"true"});
    console.log(pet)
    if (!pet) {
      throw new NotFoundException('Pet not found');
    }

    return pet;
  }

  async updatePet(id: string, petDto: PetDto){
    const pet = await this.findPetById(id);
    Object.assign(pet, petDto);
    const updatedPet = await pet.save(); 
    return updatedPet;
  }

  async uploadPetImageUrl(id: string, imageUrl: string): Promise<Pet> {
    const pet = await this.petModel.findById(id).exec();
    if (!pet) {
      throw new Error('Pet not found');
    }
    if (pet.imageUrl) {
      pet.imageHistory = [pet.imageUrl, ...(pet.imageHistory || [])];
    }

    pet.imageUrl = imageUrl;
    return pet.save();
  }

  async deletePet(id:string){
    const pet = await this.findPetById(id);
    pet.isActive = "false";
    pet.save()
  }

  async deletePictureUrl(id: string): Promise<Pet> {
    const pet = await this.findPetById(id);
    if (!pet.imageUrl) {
      throw new NotFoundException('Picture URL not found for the pet');
    }
    if (!pet.imageHistory) {
      pet.imageHistory = [];
    }
    pet.imageHistory.unshift(pet.imageUrl); 
    pet.imageUrl = ''; 
    const updatedPet = await pet.save(); 
    return updatedPet;
  }
}


