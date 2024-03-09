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
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { RolesGuard } from 'src/role/guard/role.guard';
import { Roles } from 'src/role/role.decorator';
import { Role } from 'src/role/role.enum';
import { VetService } from './vet.service';
import { Vet } from './schemas/vet.schema';
import { CreateVetDto } from './dto/vet.dto';

@Controller('vet')
export class VetController {
  constructor(
    private vetService: VetService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Post('/register')
  async register(@Body() createVetDto: CreateVetDto): Promise<Vet> {
    const {
      vetId,
      name,
      email,
      password,
      phoneNo,
      address,
      area,
      city,
      state,
      YearsOfExperience,
      services,
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
    const vet = {
      vetId,
      name,
      email,
      password: hashedPassword,
      phoneNo,
      address,
      area,
      city,
      state,
      YearsOfExperience,
      services,
      role: 'vet',
    };

    const existingVet = await this.vetService.findByWithEmail(email);
    if (existingVet) {
      throw new BadRequestException('Email already exists');
    }
    const newVet = await this.vetService.register(vet);
    return newVet;
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Get('/')
  async getTrainers() {
    return this.vetService.findVet();
  }

  @Get('/:id')
  async getTrainerByID(@Param('id') trainerId: string) {
    return this.vetService.findVetById(trainerId);
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
      const trainer = await this.vetService.findVetById(trainerId);

      if (!trainer) {
        throw new NotFoundException('Trainer Not Found!');
      }

      await this.vetService.uploadUserPictureUrl(
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
    @Body() updateUserDto: CreateVetDto,
    @Param('id') trainerId: string,
  ) {
    return this.vetService.updateTrainer(trainerId, updateUserDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Delete('/:id')
  async deleteTrainer(@Param('id') trainerId: string) {
    return this.vetService.deleteTrainer(trainerId);
  }

  @Delete('/:id/deleteImage')
  async deletePictureUrl(@Param('id') trainerId: string) {
    return await this.vetService.deleteUserPictureUrl(trainerId);
  }

  @Post('/:bookingId/confirm')
  async confirm(@Param('bookingId') bookingId: string) {
    return await this.vetService.confirm(bookingId);
  }
}
