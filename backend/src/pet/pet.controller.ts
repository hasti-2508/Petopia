import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetDto } from './dto/pet.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';


@Controller('pet')
export class PetController {
    constructor(
        private petService : PetService,
        private cloudinaryService: CloudinaryService,
    ){}

@Get()
async findPet(){
    return await this.petService.findPet()
}

@Get("/:id")
async findPetByID(
    @Param('id') petId: string
){
    return this.petService.findPetById(petId)
}

@Post('/')
async createPet(@Body() petDto: PetDto ){
    return await this.petService.createPet(petDto)
}

@Post(':id/uploadImage')
@UseInterceptors(
  FileInterceptor('image', {
    storage: diskStorage({
      destination: './assets/',
      filename: (req, file, callback) => {
        const fileName = path.parse(file.originalname).name.replace(/\s/g, '');
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
      return res.json({
        success: false,
        message: 'No file uploaded or file path is missing.',
      });
    }

    const cloudinaryResponse = await this.cloudinaryService.uploadOnCloudinary(file.path);
    const pet = await this.petService.findPetById(petId);

    if (!pet) {
      return res.json({
        success: false,
        message: 'Pet not found',
      });
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
async updatePet(
    @Body() petDto: PetDto,
    @Param('id') petId: string
){
    let updatedPet = await this.petService.updatePet(petId, petDto);
    return updatedPet;
}

@Delete(':id')
async deletePet(
    @Param('id') petId: string
){
    return this.petService.deletePet(petId)
}

@Delete('/:id/Image')
  async deletePictureUrl(@Param('id') petId: string) {
    return await this.petService.deletePictureUrl(petId);
  }

}

