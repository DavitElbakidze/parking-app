import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from 'src/entities/car.entity';
import { CarsController } from './cars.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Car]), UsersModule],
  providers: [CarsService],
  controllers: [CarsController],
  exports: [CarsService],
})
export class CarsModule {}
