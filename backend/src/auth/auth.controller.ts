import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
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
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { LoginDto, ResetPasswordDto } from './dto/auth.dto';
import { JwtInterceptor } from 'src/interceptor/jwt.interceptor';
import JwtPayload from 'src/interceptor/interface/jwtpayload';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('/login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<object> {
    const { email, password } = loginDto;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new BadRequestException('Invalid email format');
    }
    let user;
    user = await this.authService.findByEmailInUser(email);
    if (!user) {
      throw new UnauthorizedException('No such user found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new HttpException('Password Incorrect', 403);
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

  // @UseGuards(AuthGuard)
  @Get('/currentUser')
  @UseInterceptors(JwtInterceptor)
  async currentUser(@Req() request: Request) {
    try {
      const data: JwtPayload = request.token;
      if (!data) {
        throw new UnauthorizedException('No Data found');
      }
      const user = await this.authService.findByEmailInUser(data.email);
      if (!user) {
        throw new NotFoundException('No user found');
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException('Please login first!');
    }
  }

  @Post('/logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return { message: 'Logged out' };
  }

  @Post('forgetPassword')
  async sendPasswordResetEmail(@Body() resetPasswordDto: ResetPasswordDto) {
    const { email } = resetPasswordDto;
    let user;
    user = await this.authService.findByEmailInUser(email);
    if (!user) {
      throw new UnauthorizedException('No such user found');
    }
    await this.authService.sendPasswordResetEmail(user);
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
