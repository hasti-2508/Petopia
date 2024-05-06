import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/user.dto';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';
import { PetService } from 'src/pet/pet.service';
import { JwtInterceptor } from 'src/interceptor/jwt.interceptor';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { Role } from 'src/role/role.enum';
import { RolesGuard } from 'src/role/guard/role.guard';
import { Roles } from 'src/role/decorator/role.decorator';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private petService: PetService,
  ) {}

  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password, phoneNo, address, city, state, imageUrl } =
      createUserDto;
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
    const hashedPassword = await bcrypt.hash(password, 10);
    const user: CreateUserDto = {
      name,
      email,
      password: hashedPassword,
      phoneNo,
      address,
      city,
      state,
      role: 'user',
      isActive: true,
      imageUrl,
    };

    if (!address && !city && !state) {
      throw new BadRequestException('please provide complete address details');
    }

    const existingUser = await this.userService.findByWithEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }
    const newUser = await this.userService.register(user);
    return newUser;
  }

  @Get('/')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async getUsers(@Query() query: ExpressQuery): Promise<User[]> {
    return this.userService.findUser(query);
  }

  @Get('/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.USER, Role.VET, Role.TRAINER)
  async getUserByID(@Param('id') userId: string) {
    try {
      const user = await this.userService.findUserById(userId);
      const getPetsPromises = user.pets.map((id: any) =>
        this.petService.findPetById(id),
      );
      const pets = await Promise.all(getPetsPromises);
      if (!user) {
        throw new HttpException('User Not Found', 404);
      }
      return { user, pets };
    } catch (error) {
      console.error(error);
    }
  }

  @Patch('update/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  async updateUser(
    @Body() updateUserDto,
    @Param('id') userId: string,
  ): Promise<User> {
    return this.userService.updateUser(userId, updateUserDto);
  }

  @Delete('delete/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async deleteUser(@Param('id') userId: string) {
    return this.userService.deleteUser(userId);
  }

  @Post('/:petId/adopt')
  @UseGuards(RolesGuard)
  @Roles(Role.USER)
  @UseInterceptors(JwtInterceptor)
  async isAdopted(@Param('petId') petId: string, @Req() request) {
    const data = request.token;
    if (!data) {
      throw new NotFoundException('Please Login first!');
    }
    const userId = data.userId;
    return await this.userService.isAdopted(petId, userId);
  }
}
