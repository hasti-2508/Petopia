import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PetSchema } from 'src/pet/schemas/pet.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: "User", schema: UserSchema}]),
  MongooseModule.forFeature([{name:'Pet', schema: PetSchema}])],
  controllers: [UserController],
  providers: [UserService, CloudinaryService]
})
export class UserModule {}
