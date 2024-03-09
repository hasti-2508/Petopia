import { Module } from '@nestjs/common';
import { PetController } from './pet.controller';
import { PetService } from './pet.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PetSchema } from './schemas/pet.schema';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UserSchema } from 'src/user/schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{name:'Pet', schema: PetSchema}]),
  MongooseModule.forFeature([{name: "User", schema: UserSchema}])],
  controllers: [PetController],
  providers: [PetService,CloudinaryService]
})
export class PetModule {}
