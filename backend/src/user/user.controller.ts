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
  UnauthorizedException,
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

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private cloudinaryService: CloudinaryService,
    private jwtService: JwtService
  ) {}

  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password, phoneNo, address, area, city, state } =
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
      area,
      city,
      state,
      role: 'user',
      isActive: true,
    };

    if (!address && !area && !city && !state) {
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
  async getUsers() {
    return this.userService.findUser();
  }

  @Get('/:id')
  async getUserByID(@Param('id') userId: string) {
    return this.userService.findUserById(userId);
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
        throw new NotFoundException("No file uploaded or file path is missing")
      }

      const cloudinaryResponse =
        await this.cloudinaryService.uploadOnCloudinary(file.path);
      const pet = await this.userService.findUserById(userId);

      if (!pet) {
        throw new NotFoundException("Pet Not Found!")
      }

      await this.userService.uploadUserPictureUrl(
        userId,
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
    @Body() updateUserDto: CreateUserDto,
    @Param('id') userid: string,
  ) {
    return this.userService.updateUser(userid, updateUserDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    return this.userService.deleteUser(userId);
  }

  @Delete('/:id/deleteImage')
  async deletePictureUrl(@Param('id') userId: string) {
    return await this.userService.deleteUserPictureUrl(userId);
  }

  @Post('/:petId/adopt')
  async isAdopted(@Param('petId') petId: string,
  @Req() req) {
    const token = req.cookies.jwt;

        if(!token){
            throw new NotFoundException("User Should be logged in")
        }
        const decodedToken = this.jwtService.decode(token);
        const userId = decodedToken.userId;
    return await this.userService.isAdopted(petId,userId)
  }

}
