import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PetSchema } from 'src/pet/schemas/pet.schema';
import { PetService } from 'src/pet/pet.service';

@Module({
  imports: [MongooseModule.forFeature([{name: "User", schema: UserSchema}]),
  MongooseModule.forFeature([{name:'Pet', schema: PetSchema}])],
  controllers: [UserController],
  providers: [UserService,PetService]
})
export class UserModule {}
