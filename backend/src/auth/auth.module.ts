import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { UserSchema } from 'src/user/schemas/user.schema';
import { TrainerSchema } from 'src/trainer/schemas/trainer.schema';

@Module({
  imports:[MongooseModule.forFeature([{name: "User", schema: UserSchema}]),
  MongooseModule.forFeature([{name:"Trainer", schema: TrainerSchema}]),
  ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  }),
  JwtModule.register({
    global: true,
    secret: process.env.SECRET,
    signOptions: { expiresIn: '6d' },
  }),
  UserModule,],
  controllers: [AuthController ],
  providers: [AuthService,CloudinaryService]
})
export class AuthModule {}
