import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PetService } from './pet.service';
import { PetDto, PetFilterDto, PetSortDto } from './dto/pet.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { JwtService } from '@nestjs/jwt';
import { Query as ExpressQuery} from 'express-serve-static-core';
import JwtPayload from 'src/interceptor/interface/jwtpayload';
import { JwtInterceptor } from 'src/interceptor/jwt.interceptor';

@Controller('pet')
export class PetController {
  constructor(
    private petService: PetService,
    private cloudinaryService: CloudinaryService,
    private jwtService: JwtService,
  ) {}

  @Get()
  async findPet(
    @Query() filterDto: PetFilterDto,
    @Query() sortDto: PetSortDto,
    @Query() query: ExpressQuery
  ) {
    return await this.petService.findPet(filterDto, sortDto,query);
  }

  @Get('/:id')
  async findPetByID(@Param('id') petId: string) {
    return this.petService.findPetById(petId);
  }

  @Post('/')
  @UseInterceptors(JwtInterceptor)
  async createPet(@Body() petDto: PetDto, @Req() request) {
    const data : JwtPayload = request.token;;
    if (!data) {
      throw new HttpException('User Should be logged in',401);
    }
    const userId = data.userId;
    return await this.petService.createPet(petDto, userId);
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
    @Param('id') petId: string,
  ) {
    try {
      if (!file || !file.path) {
        throw new HttpException("No file uploaded or file path is missing.",400)
      }

      const cloudinaryResponse =
        await this.cloudinaryService.uploadOnCloudinary(file.path);
      const pet = await this.petService.findPetById(petId);

      if (!pet) {
       throw new HttpException("Pet Not Found", 400)
      }

      await this.petService.uploadPetImageUrl(petId, cloudinaryResponse.url);

      return res.json({
        success: true,
        data: file.path,
        cloudinaryResponse: cloudinaryResponse,
      });
    } catch (error) {
      return res.json({
        success: false,
        error: 'Failed to upload image',
      });
    }
  }

  @Put('/:id')
  async updatePet(@Body() petDto: PetDto, @Param('id') petId: string) {
    let updatedPet = await this.petService.updatePet(petId, petDto);
    return updatedPet;
  }

  @Delete(':id')
  async deletePet(@Param('id') petId: string) {
    return this.petService.deletePet(petId);
  }

  @Delete('/:id/Image')
  async deletePictureUrl(@Param('id') petId: string) {
    return await this.petService.deletePictureUrl(petId);
  }
}
