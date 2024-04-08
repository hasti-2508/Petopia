import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { PetDto, PetFilterDto, PetSortDto } from './dto/pet.dto';
import { Pet } from './schemas/pet.schema';
import { User } from 'src/user/schemas/user.schema';
import { Query } from 'express-serve-static-core';

@Injectable()
export class PetService {
  constructor(
    @InjectModel(Pet.name)
    private petModel: mongoose.Model<Pet>,
    @InjectModel(User.name)
    private UserModel: mongoose.Model<User>,
  ) {}

  async findPet(
    filterDto: PetFilterDto,
    sortDto: PetSortDto,
    qu: Query,
  ): Promise<Pet[]> {
    let query = this.petModel.find({ isActive: "true", isAdopted:"false" }); //isAdopted: false
    const resPerPage = 16;
    const currentPage = Number(qu.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    if (filterDto) {
      if (filterDto.species) {
        query = query.where('species').equals(filterDto.species);
      }
      if (filterDto.breed) {
        query = query.where('breed').equals(filterDto.breed);
      }
      if (filterDto.age) {
        query = query.where('age').equals(filterDto.age);
      }
      if (filterDto.gender) {
        query = query.where('gender').equals(filterDto.gender);
      }
      if (filterDto.city) {
        query = query.where('city').equals(filterDto.city);
      }
      if (filterDto.state) {
        query = query.where('state').equals(filterDto.state);
      }
    }

    if (sortDto && sortDto.sortBy) {
      const sortOrder = sortDto.sortOrder === 'desc' ? -1 : 1;
      query = query.sort({ [sortDto.sortBy]: sortOrder });
    }

    return query.limit(resPerPage).skip(skip).exec();
  }

  async createPet(petDto: PetDto, userId: string): Promise<Pet> {
    const pet = await this.petModel.create({ ...petDto, owner: userId });
    const user = await this.UserModel.findById(userId);
    user.pets.push( pet.id);
    await user.save();
    return pet; 
  }

  async findPetById(id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('Invalid ID', 400);
    }
    const pet = await this.petModel.findOne({ _id: id, isActive: 'true' });
    if (!pet) {
      throw new NotFoundException('Pet not found');
    }
    return pet;
  }

  async updatePet(id: string, petDto: PetDto) {
    const pet = await this.findPetById(id);
    Object.assign(pet, petDto);
    const updatedPet = await pet.save();
    return updatedPet;
  }

  async uploadPetImageUrl(id: string, imageUrl: string): Promise<Pet> {
    console.log('i am in service');
    const pet = await this.petModel.findById(id);

    if (!pet) {
      throw new Error('Pet not found');
    }
    if (pet.imageUrl) {
      pet.imageHistory = [pet.imageUrl, ...(pet.imageHistory || [])];
    }

    pet.imageUrl = imageUrl;
    return await pet.save();
  }

  async deletePet(id: string) {
    const pet = await this.findPetById(id);
    pet.isActive = 'false';
    pet.save();
  }

  async deletePictureUrl(id: string): Promise<Pet> {
    const pet = await this.findPetById(id);
    if (!pet.imageUrl) {
      throw new NotFoundException('Picture not found for the pet');
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
