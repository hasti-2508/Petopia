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
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { AuthGuard } from './guards/auth.guard';
import { LoginDto, ResetPasswordDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';


@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService
  ) {}

  
  @Post('/login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<object> {
    const { email, password, role } = loginDto;

    if(!role){
      throw new BadRequestException("Please define your Role")
    }
    let user;
     if(role === 'user' || role === 'admin'){
      user =   await this.authService.findByEmailInUser(email);
     }
     else if(role === 'trainer'){
      user = await this.authService.findByEmailInTrainer(email);
     }
     else if(role === 'vet'){
      user = await this.authService.findByEmailInVet(email);
     }

    if (!user) {
      throw new BadRequestException('No such user found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Password Incorrect');
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

      let user;

      if (data.role === 'user') {
        user = await this.authService.findByEmailInUser(data.email);
      } else if (data.role === 'trainer') {
        user = await this.authService.findByEmailInTrainer(data.email);
      } else {
        throw new UnauthorizedException('Invalid role');
      }

      if (!user) {
        throw new UnauthorizedException('No user found');
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException('Unauthorized');
    }
  }

  @Post('/logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return { message: 'Logged out' };
  }

  @Post('forgetPassword')
  async sendPasswordResetEmail(@Body() resetPasswordDto: ResetPasswordDto)   {

    const { email, role } = resetPasswordDto;
    let user;
     if(role === 'user' || role === 'admin'){
      user =   await this.authService.findByEmailInUser(email);

      if (!user) {
        throw new BadRequestException('No such user found');
      }
  
      await this.authService.sendPasswordResetEmail(user);
     }
     else if(role === 'trainer'){
      user = await this.authService.findByEmailInTrainer(email);

      if (!user) {
        throw new BadRequestException('No such user found');
      }
  
      await this.authService.sendPasswordResetEmail(user);
     }
     else if(role === 'vet'){
      user = await this.authService.findByEmailInVet(email);

      if (!user) {
        throw new BadRequestException('No such user found');
      }
      await this.authService.sendPasswordResetEmail(user);
     }

    
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
