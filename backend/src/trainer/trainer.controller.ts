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
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import * as bcrypt from 'bcrypt';
import { CreateTrainerDto } from './dto/trainer.dto';
import { TrainerService } from './trainer.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { RolesGuard } from 'src/role/guard/role.guard';
import { Roles } from 'src/role/role.decorator';
import { Role } from 'src/role/role.enum';
import { Trainer } from './schemas/trainer.schema';
import { JwtService } from '@nestjs/jwt';

@Controller('trainer')
export class TrainerController {
  constructor(
    private trainerService: TrainerService,
    private cloudinaryService: CloudinaryService,
    private jwtService: JwtService,
  ) {}

  @Post('/register')
  async register(@Body() createTrainerDto: CreateTrainerDto): Promise<Trainer> {
    const {
      trainerId,
      name,
      email,
      password,
      phoneNo,
      address,
      area,
      city,
      state,
      YearsOfExperience,
      numberOfPetsTrained,
      services,
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

    if (!address && !area && !city && !state) {
      throw new BadRequestException('please provide complete address details');
    }
    if (!YearsOfExperience) {
      throw new BadRequestException('Please add your years of Experience');
    }
    if (!services) {
      throw new BadRequestException('Please add  the services you offer');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const trainer: CreateTrainerDto = {
      trainerId,
      name,
      email,
      password: hashedPassword,
      phoneNo,
      address,
      area,
      city,
      state,
      YearsOfExperience,
      numberOfPetsTrained,
      role: 'trainer',
      services,
    };

    const existingTrainer = await this.trainerService.findByWithEmail(email);
    if (existingTrainer) {
      throw new BadRequestException('Email already exists');
    }
    const newTrainer = await this.trainerService.register(trainer);
    return newTrainer;
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Get('/')
  async getTrainers() {
    return this.trainerService.findTrainer();
  }

  @Get('/:id')
  async getTrainerByID(@Param('id') trainerId: string) {
    return this.trainerService.findTrainerById(trainerId);
  }

  @Post(':id/uploadImage')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './assets/',
        filename: (req, file, callback) => {
          const fileName = path
            .parse(file.originalname)
            .name.replace(/\s/g, '');
          const extension = path.parse(file.originalname).ext;
          callback(null, `${fileName}${extension}`);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile() file,
    @Res() res,
    @Param('id') trainerId: string,
  ) {
    try {
      if (!file || !file.path) {
        throw new NotFoundException('No file uploaded or file path is missing');
      }

      const cloudinaryResponse =
        await this.cloudinaryService.uploadOnCloudinary(file.path);
      const trainer = await this.trainerService.findTrainerById(trainerId);

      if (!trainer) {
        throw new NotFoundException('Trainer Not Found!');
      }

      await this.trainerService.uploadUserPictureUrl(
        trainerId,
        cloudinaryResponse.url,
      );

      return cloudinaryResponse;
    } catch (error) {
      return res.json({
        success: false,
        error: 'Failed to upload image',
      });
    }
  }

  @Put('/:id')
  async updateUser(
    @Body() updateUserDto: CreateTrainerDto,
    @Param('id') trainerId: string,
  ) {
    return this.trainerService.updateTrainer(trainerId, updateUserDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Delete('/:id')
  async deleteTrainer(@Param('id') trainerId: string) {
    return this.trainerService.deleteTrainer(trainerId);
  }

  @Delete('/:id/deleteImage')
  async deletePictureUrl(@Param('id') trainerId: string) {
    return await this.trainerService.deleteUserPictureUrl(trainerId);
  }

  @Post('/:bookingId/confirm')
  async confirm(@Param('bookingId') bookingId: string,@Req() req) {
    const token = req.cookies.jwt;
    if (!token) {
      throw new NotFoundException('Vet Should be logged in');
    }
    const decodedToken = this.jwtService.decode(token);
    const trainerId = decodedToken.userId;
    return await this.trainerService.confirm(bookingId,trainerId);
  }
}
