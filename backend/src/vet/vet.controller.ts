import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { VetService } from './vet.service';
import { Vet } from './schemas/vet.schema';
import { CreateVetDto } from './dto/vet.dto';
import { JwtService } from '@nestjs/jwt';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('vet')
export class VetController {
  constructor(
    private vetService: VetService,
    private jwtService: JwtService,
  ) {}

  @Post('/register')
  async register(@Body() createVetDto: CreateVetDto): Promise<Vet> {
    const {
      name,
      email,
      password,
      phoneNo,
      address,
      city,
      state,
      YearsOfExperience,
      services,
      imageUrl,
    } = createVetDto;
    if (password.length < 6) {
      throw new BadRequestException(
        'Password must be at least 6 characters long',
      );
    }

    if (!/[A-Z]/.test(password)) {
      throw new BadRequestException(
        'Password must contain at least one uppercase letter',
      );
    }

    if (!/[a-z]/.test(password)) {
      throw new BadRequestException(
        'Password must contain at least one lowercase letter',
      );
    }

    if (!/\d/.test(password)) {
      throw new BadRequestException('Password must contain at least one digit');
    }

    if (!/[!@#$%^&*()_+{}[\]:";<>?,./\\|`~-]/.test(password)) {
      throw new BadRequestException(
        'Password must contain at least one special character',
      );
    }

    if (/\s/.test(password)) {
      throw new BadRequestException('Password must not contain whitespace');
    }
    if (!/^\d{10}$/.test(String(phoneNo))) {
      throw new BadRequestException('Phone number must be exactly 10 digits');
    }

    if (!address && !city && !state) {
      throw new BadRequestException('please provide complete address details');
    }
    if (!YearsOfExperience) {
      throw new BadRequestException('Please add your years of Experience');
    }
    if (!services) {
      throw new BadRequestException('Please add  the services you offer');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const vet = {
      name,
      email,
      password: hashedPassword,
      phoneNo,
      address,
      city,
      state,
      YearsOfExperience,
      services,
      role: 'vet',
      imageUrl,
    };

    const existingVet = await this.vetService.findByWithEmail(email);
    if (existingVet) {
      throw new BadRequestException('Email already exists');
    }
    const newVet = await this.vetService.register(vet);
    return newVet;
  }

  @Get('/')
  async getVet(@Query() query: ExpressQuery): Promise<Vet[]> {
    return await this.vetService.findVet(query);
  }

  @Get('/available/')
  async getAvailableVet() {
    return await this.vetService.findAvailableVet();
  }

  @Get('/:id')
  async getTrainerByID(@Param('id') trainerId: string) {
    return await this.vetService.findVetById(trainerId);
  }
  @Patch('update/:id')
  async updateUser(@Body() updateUserDto, @Param('id') trainerId: string) {
    return this.vetService.updateVet(trainerId, updateUserDto);
  }

  @Delete('/:id')
  async deleteTrainer(@Param('id') trainerId: string) {
    return this.vetService.deleteTrainer(trainerId);
  }

  @Delete('/:id/deleteImage')
  async deletePictureUrl(@Param('id') trainerId: string) {
    return await this.vetService.deleteUserPictureUrl(trainerId);
  }

  @Post('/:bookingId/confirm')
  async confirm(@Param('bookingId') bookingId: string, @Req() req) {
    const token = req.cookies.jwt;
    if (!token) {
      throw new NotFoundException('Vet Should be logged in');
    }
    const decodedToken = this.jwtService.decode(token);
    const vetId = decodedToken.userId;
    return await this.vetService.confirm(bookingId, vetId);
  }

  @Patch(':id/available')
  async markIsAvailable(@Param('id') id: string) {
    return await this.vetService.markIsAvailable(id);
  }

  @Patch('/:id/notify')
  async notifyVet(@Param('id') vetId: string) {
    return await this.vetService.notifyVet(vetId);
  }

}
