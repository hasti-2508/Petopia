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
  UseInterceptors,
} from '@nestjs/common';
import { PetService } from './pet.service';
import { PetDto, PetFilterDto, PetSortDto } from './dto/pet.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import JwtPayload from 'src/interceptor/interface/jwtpayload';
import { JwtInterceptor } from 'src/interceptor/jwt.interceptor';

@Controller('pet')
export class PetController {
  constructor(private petService: PetService) {}

  @Get()
  async findPet(
    @Query() filterDto: PetFilterDto,
    @Query() sortDto: PetSortDto,
    @Query() query: ExpressQuery,
  ) {
    return await this.petService.findPet(filterDto, sortDto, query);
  }

  @Get('/:id')
  async findPetByID(@Param('id') petId: string) {
    return this.petService.findPetById(petId);
  }

  @Post('/')
  @UseInterceptors(JwtInterceptor)
  async createPet(@Body() petDto: PetDto, @Req() request) {
    const data: JwtPayload = request.token;
    if (!data) {
      throw new HttpException('User Should be logged in', 401);
    }
    const userId = data.userId;
    return await this.petService.createPet(petDto, userId);
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
