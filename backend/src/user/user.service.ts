import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/user.dto';
import { Pet } from 'src/pet/schemas/pet.schema';
import { Query } from 'express-serve-static-core';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private UserModel: mongoose.Model<User>,
    @InjectModel(Pet.name)
    private petModel: mongoose.Model<Pet>,
  ) {}

  async findUser(qu: Query): Promise<User[]> {
    let query = this.UserModel.find({ isActive: true, role: 'user' });
    const resPerPage = 9;
    const currentPage = Number(qu.page) || 1;
    const skip = resPerPage * (currentPage - 1);
    return query.limit(resPerPage).skip(skip).exec();
  }
  async register(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.UserModel.create(createUserDto);
    return newUser;
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this.UserModel.findOne({ email, isActive: true });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  async findByWithEmail(email: string): Promise<User> {
    const user = await this.UserModel.findOne({ email, isActive: true });
    return user;
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

  async updateUser(id: string, fieldsToUpdate: any): Promise<User> {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('Invalid Id', 400);
    }
    const updateObj: any = {};
    for (const key in fieldsToUpdate) {
      if (fieldsToUpdate.hasOwnProperty(key)) {
        updateObj[key] = fieldsToUpdate[key];
      }
    }

    const updatedUser = await this.UserModel.findByIdAndUpdate(
      id,
      { $set: updateObj },
      { new: true },
    );

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser;
  }

  async deleteUser(id: string) {
    const user = await this.findUserById(id);
    user.isActive = false;
    user.save();
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

  async isAdopted(petId: string, userId: string) {
    const pet = await this.petModel.findById(petId);
    if (!pet) {
      throw new NotFoundException('Pet Not Found');
    }
    pet.isAdopted = true;
    const ownerOfPetId = pet.owner;
    const ownerOfPet = await this.UserModel.findById(ownerOfPetId);
    if (!ownerOfPet) {
      throw new NotFoundException('No Owner Found');
    }
    ownerOfPet.petHistory.push(petId);
    ownerOfPet.pets = ownerOfPet.pets.filter((pet) => pet.toString() !== petId);
    ownerOfPet.save();
    const user = await this.UserModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    pet.owner = (await user).id;
    pet.save();

    user.pets.push((await pet).id);
    user.save();
    return;
  }
}
