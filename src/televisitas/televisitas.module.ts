import { Module } from '@nestjs/common';
import { TelevisitasService } from './televisitas.service';
import { TelevisitasController } from './televisitas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Televisita } from './entities/televisita.entity';
import { Location } from './entities/location.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Televisita, Location])
  ],
  controllers: [TelevisitasController],
  providers: [TelevisitasService],
})
export class TelevisitasModule {}
