import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateTrainerDto } from './dto/trainer.dto';
import { TrainerService } from './trainer.service';
import { Trainer } from './schemas/trainer.schema';
import { JwtService } from '@nestjs/jwt';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { TrainingPlanBooking } from 'src/training-plan-booking/schemas/training-plan-booking.schema';
import { RolesGuard } from 'src/role/guard/role.guard';
import { Roles } from 'src/role/decorator/role.decorator';
import { Role } from 'src/role/role.enum';

@Controller('trainer')
export class TrainerController {
  constructor(
    private trainerService: TrainerService,
    private jwtService: JwtService,
  ) {}

  @Post('/register')
  async register(@Body() createTrainerDto: CreateTrainerDto): Promise<Trainer> {
    const {
      name,
      email,
      password,
      phoneNo,
      address,
      city,
      state,
      YearsOfExperience,
      NumberOfPetsTrained,
      trainings,
      imageUrl,
    } = createTrainerDto;
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
    if (!NumberOfPetsTrained) {
      throw new BadRequestException('Please add number of pets you trained');
    }
    if (!trainings) {
      throw new BadRequestException('Please add  the trainings you offer');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const trainer: CreateTrainerDto = {
      name,
      email,
      password: hashedPassword,
      phoneNo,
      address,
      city,
      state,
      YearsOfExperience,
      NumberOfPetsTrained,
      role: 'trainer',
      trainings,
      imageUrl,
    };

    const existingTrainer = await this.trainerService.findByWithEmail(email);
    if (existingTrainer) {
      throw new BadRequestException('Email already exists');
    }
    const newTrainer = await this.trainerService.register(trainer);
    return newTrainer;
  }

  @Get('/')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async getTrainers(@Query() query: ExpressQuery): Promise<Trainer[]> {
    return this.trainerService.findTrainer(query);
  }

  @Get('/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.USER , Role.TRAINER, Role.VET)
  async getTrainerByID(@Param('id') trainerId: string): Promise<Trainer> {
    return this.trainerService.findTrainerById(trainerId);
  }

  @Put('/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.USER , Role.TRAINER, Role.VET)
  async updateUser(
    @Body() updateUserDto: CreateTrainerDto,
    @Param('id') trainerId: string,
  ): Promise<Trainer> {
    return this.trainerService.updateTrainer(trainerId, updateUserDto);
  }

  @Delete('/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async deleteTrainer(@Param('id') trainerId: string) {
    return this.trainerService.deleteTrainer(trainerId);
  }

  @Post('/:bookingId/confirm')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.USER , Role.TRAINER, Role.VET)
  async confirm(
    @Param('bookingId') bookingId: string,
    @Req() req,
  ): Promise<TrainingPlanBooking> {
    const token = req.cookies.jwt;
    if (!token) {
      throw new NotFoundException('Vet Should be logged in');
    }
    const decodedToken = this.jwtService.decode(token);
    const trainerId = decodedToken.userId;
    return await this.trainerService.confirm(bookingId, trainerId);
  }
}
