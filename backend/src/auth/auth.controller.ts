import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
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
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { User } from './schemas/auth.user.schema';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { AuthGuard } from './guards/auth.guard';
import { CreateUserDto } from './dto/auth.user.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { RolesGuard } from 'src/role/guard/role.guard';
import { Roles } from 'src/role/role.decorator';
import { Role } from 'src/role/role.enum';

@Controller('user')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private cloudinaryService: CloudinaryService,
  ) {}

@UseGuards(RolesGuard)
@Roles(Role.ADMIN)
  @Get('/')
  async getUsers(){
    return this.authService.findUser();
  }

  @Get('/:id')
  async getUserByID(
    @Param('id') userId : string
  ){
    return this.authService.findUserById(userId)
  }

  @Post('/register')
  async register(@Body() body: CreateUserDto): Promise<User> {
    const { name, email, password, phoneNo, address, area, city, state } = body;
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

    const existingUser = await this.authService.findByWithEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }
    const newUser = await this.authService.register(user);
    return newUser;
  }

  @Post('/login')
  async login(
    @Body() body: User,
    @Res({ passthrough: true }) response: Response,
  ): Promise<object> {
    const { email, password } = body;

    const user = await this.authService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('USER NOT FOUND');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('PASSWORD INCORRECT');
    }
    const payload = {
      email: user.email,
      role: user.role,
      userId: user._id,
    };
    const jwt = await this.jwtService.signAsync(payload);
    response.cookie('jwt', jwt, { httpOnly: true });                                                            
    return { token: jwt };
  }

  @UseGuards(AuthGuard)
  @Get('/currentUser')
  async currentUser(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);                                                                                 

      if (!data) {
        throw new UnauthorizedException('No Data found');
      }
      const user = await this.authService.findByEmail(data.email);
      return user;
    } catch (error) {
      throw new UnauthorizedException('No user found');
    }
  }

  @Post('/logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return { message: 'Logged out' };
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
        return res.json({
          success: false,
          message: 'No file uploaded or file path is missing.',
        });
      }

      const cloudinaryResponse =
        await this.cloudinaryService.uploadOnCloudinary(file.path);
      const pet = await this.authService.findUserById(petId);

      if (!pet) {
        return res.json({
          success: false,
          message: 'Pet not found',
        });
      }

      await this.authService.uploadUserPictureUrl(
        petId,
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

  @Put('/:id')
  async updateCar(@Body() fieldToUpdate: CreateUserDto, @Param('id') id: string) {
    return this.authService.updateUser(id, fieldToUpdate);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    return this.authService.deleteUser(userId);
  }

  @Delete('/:id/deleteImage')
  async deletePictureUrl(@Param('id') userId: string) {
    return await this.authService.deleteUserPictureUrl(userId);
  }
}

// @Post('/SendOtp')
// async sendOtp(@Body() data: { phone: string }){
//   let prefix = '+91';
//   let phone = prefix.concat(data.phone);
//   return await this.authService.sendOtp(phone);
// }

// @Post('/VerifyOtp')
// async verifyOtp(
//   @Body() data: { phone: string; otp: string },
// ): Promise<{ msg: string }> {
//   let prefix = '+91';
//   let phone = prefix.concat(data.phone);
//   return await this.authService.verifyOtp(phone, data.otp);
// }
