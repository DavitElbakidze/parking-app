import { Module } from '@nestjs/common';
import { ParkingServiceController } from './parking-service.controller';
import { ParkingServiceService } from './parking-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingService } from 'src/entities/parking-service.entity';
import { UsersModule } from '../users/users.module';
import { CarsModule } from '../cars/cars.module';
import { ParkingAreaModule } from '../parking-area/parking-area.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ParkingService]),
    UsersModule,
    CarsModule,
    ParkingAreaModule,
  ],
  controllers: [ParkingServiceController],
  providers: [ParkingServiceService],
})
export class ParkingServiceModule {}
