import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
// import { ConfigModule } from '@nestjs/config';
import { UserSchema } from './schemas/auth.user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[MongooseModule.forFeature([{name: "User", schema: UserSchema}]),
  ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  }),
  JwtModule.register({
    global: true,
    secret: process.env.SECRET,
    signOptions: { expiresIn: '6d' },
  }),],
  controllers: [AuthController],
  providers: [AuthService,CloudinaryService]
})
export class AuthModule {}
