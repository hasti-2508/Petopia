import { Module } from '@nestjs/common';
import { TrainerController } from './trainer.controller';
import { TrainerService } from './trainer.service';
import { TrainerSchema } from './schemas/trainer.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  imports: [MongooseModule.forFeature([{name: "Trainer", schema: TrainerSchema}])],
  controllers: [TrainerController],
  providers: [TrainerService, CloudinaryService]
})
export class TrainerModule {}
