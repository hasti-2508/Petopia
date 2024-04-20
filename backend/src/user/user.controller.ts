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
  Put,
  Query,
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
import { CreateUserDto } from './dto/user.dto';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { PetService } from 'src/pet/pet.service';
import { JwtInterceptor } from 'src/interceptor/jwt.interceptor';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private cloudinaryService: CloudinaryService,
    private jwtService: JwtService,
    private petService: PetService,
  ) {}

  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password, phoneNo, address, city, state } =
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
  async getUsers(@Query() query: ExpressQuery): Promise<User[]> {
    return this.userService.findUser(query);
  }

  @Get('/:id')
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
    @Param('id') userId: string,
  ) {
    try {
      if (!file || !file.path) {
        throw new NotFoundException('No file uploaded or file path is missing');
      }

      const cloudinaryResponse =
        await this.cloudinaryService.uploadOnCloudinary(file.path);
      const user = await this.userService.findUserById(userId);

      if (!user) {
        throw new NotFoundException('User Not Found!');
      }

      await this.userService.uploadUserPictureUrl(
        userId,
        cloudinaryResponse.url,
      );

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

  // @Put('update/:id')
  // async updateUser(
  //   @Body() updateUserDto: CreateUserDto,
  //   @Param('id') userId: string,
  // ) {
  //   return this.userService.updateUser(userId, updateUserDto);
  // }
  @Patch('update/:id')
  async updateUser(@Body() updateUserDto, @Param('id') userId: string) {
    return this.userService.updateUser(userId, updateUserDto);
  }

  // @UseGuards(RolesGuard)
  // @Roles(Role.ADMIN)
  @Delete('delete/:id')
  async deleteUser(@Param('id') userId: string) {
    return this.userService.deleteUser(userId);
  }

  @Delete('/:id/deleteImage')
  async deletePictureUrl(@Param('id') userId: string) {
    return await this.userService.deleteUserPictureUrl(userId);
  }

  @Post('/:petId/adopt')
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
