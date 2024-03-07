import { Module } from '@nestjs/common';
import { VetController } from './vet.controller';
import { VetService } from './vet.service';
import { CloudinaryService as CloudierService } from 'src/cloudinary/cloudinary.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VetSchema } from './schemas/vet.schema';


@Module({
  imports: [MongooseModule.forFeature([{name: "Vet", schema: VetSchema}])],
  controllers: [VetController],
  providers: [VetService,CloudierService]
})
export class VetModule {}
