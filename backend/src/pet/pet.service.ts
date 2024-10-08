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
    let query = this.petModel.find({ isActive: 'true', isAdopted: false });
    const resPerPage = 9;
    const currentPage = Number(qu.page) || 1;
    const skip = resPerPage * (currentPage - 1);
    return query.limit(resPerPage).skip(skip).exec();
  }

  async createPet(petDto: PetDto, userId: string): Promise<Pet> {
    const pet = await this.petModel.create({ ...petDto, owner: userId });
    const user = await this.UserModel.findById(userId);
    user.pets.push(pet.id);
    await user.save();
    return pet;
  }

  async findUserById(id: string): Promise<User> {
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

  async findPetById(id: string): Promise<Pet> {
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

  async updatePet(id: string, petDto: PetDto): Promise<Pet> {
    const pet = await this.findPetById(id);
    Object.assign(pet, petDto);
    const updatedPet = await pet.save();
    return updatedPet;
  }

  async deletePet(id: string) {
    const pet = await this.findPetById(id);
    const owner = await this.UserModel.findById(pet.owner[0]);
    if (!owner) {
      throw new NotFoundException('No Owner Found');
    }
    owner.petHistory.push(id);
    owner.pets = owner.pets.filter((pet) => pet.toString() !== id);
    pet.isActive = 'false';
    pet.isAdopted = true;
    await pet.save();
    await owner.save();
    return;
  }
}
