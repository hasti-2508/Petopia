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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PetService } from './pet.service';
import { PetDto, PetFilterDto, PetSortDto } from './dto/pet.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import JwtPayload from 'src/interceptor/interface/jwtpayload';
import { JwtInterceptor } from 'src/interceptor/jwt.interceptor';
import { Pet } from './schemas/pet.schema';
import { User } from 'src/user/schemas/user.schema';
import { Role } from 'src/role/role.enum';
import { RolesGuard } from 'src/role/guard/role.guard';
import { Roles } from 'src/role/decorator/role.decorator';

@Controller('pet')
export class PetController {
  constructor(private petService: PetService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.USER, Role.TRAINER, Role.VET)
  async findPet(
    @Query() filterDto: PetFilterDto,
    @Query() sortDto: PetSortDto,
    @Query() query: ExpressQuery,
  ): Promise<Pet[]> {
    return await this.petService.findPet(filterDto, sortDto, query);
  }

  @Get('/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.USER, Role.TRAINER, Role.VET)
  async findPetByID(@Param('id') petId: string): Promise<Pet> {
    return this.petService.findPetById(petId);
  }

  @Get('/user/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.USER , Role.TRAINER, Role.VET)
  async getUserByID(@Param('id') userId: string): Promise<User> {
    try {
      const user = await this.petService.findUserById(userId);
      return user;
    } catch (error) {
      console.error(error);
    }
  }

  @Post('/')
  @UseGuards(RolesGuard)
  @Roles(Role.USER)
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
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  async updatePet(
    @Body() petDto: PetDto,
    @Param('id') petId: string,
  ): Promise<Pet> {
    let updatedPet = await this.petService.updatePet(petId, petDto);
    return updatedPet;
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async deletePet(@Param('id') petId: string) {
    return this.petService.deletePet(petId);
  }
}
