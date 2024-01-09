import { Module } from '@nestjs/common';
import { ParkingAreaService } from './parking-area.service';
import { ParkingAreaController } from './parking-area.controller';
import { ParkingArea } from 'src/entities/parking-area.entyty';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingArea]), UsersModule],
  providers: [ParkingAreaService],
  controllers: [ParkingAreaController],
  exports: [ParkingAreaService],
})
export class ParkingAreaModule {}
