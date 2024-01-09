import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ParkingService,
  ParkingStatusEnum,
} from 'src/entities/parking-service.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CarsService } from '../cars/cars.service';
import { ParkingAreaService } from '../parking-area/parking-area.service';
import { User } from 'src/entities/user.entity';
import { StartParkingDto } from './dtos/startParking.dto';

@Injectable()
export class ParkingServiceService {
  constructor(
    @InjectRepository(ParkingService)
    private readonly parkingServiceRepository: Repository<ParkingService>,
    private readonly userService: UsersService,
    private readonly carService: CarsService,
    private readonly areaService: ParkingAreaService,
  ) {}

  async checkInProgresParking(userId: number, userData) {
    if (userId != userData.userId) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const queryBuilder = await this.parkingServiceRepository
      .createQueryBuilder('parkingService')
      .leftJoinAndSelect('parkingService.user', 'user')
      .where('parkingService.user = :userId', { userId })
      .andWhere('parkingService.parkingStatus = "IN_PROGRESS"')
      .getMany();

    return queryBuilder;
  }

  async startParking(startParkingDto: StartParkingDto, userData) {
    const user = await this.userService.findOne(userData.email);
    const car = await this.carService.getCarById(startParkingDto.carId, user);
    const area = await this.areaService.getAreaById(startParkingDto.areaId);

    const checkInProgresParking = await this.checkInProgresParking(
      user.id,
      userData,
    );

    if (checkInProgresParking.length > 0) {
      throw new BadRequestException('User is already on parking');
    }

    const startParking = new ParkingService();
    (startParking.car = car),
      (startParking.parkingArea = area),
      (startParking.user = user),
      (startParking.endTime = null);

    const result = await this.parkingServiceRepository.save(startParking);
    return result;
  }

  async getServiceById(serviceId) {
    const parkingService = await this.parkingServiceRepository.findOne({
      where: { id: serviceId },
    });
    if (!parkingService) {
      throw new NotFoundException('Service not found');
    }

    return parkingService;
  }

  async countParkingFee(startTime, endTime, hourlyPrice) {
    const milisecondsBetween = endTime.getTime() - startTime.getTime();

    const timeDifference = milisecondsBetween / (1000 * 60 * 60);

    const parkingFee = parseFloat(timeDifference.toFixed(1)) * hourlyPrice;
    return parkingFee;
  }

  async endParking(parkingServiceId: number, userData: User) {
    const parkingService = await this.getServiceById(parkingServiceId);

    if (parkingService.parkingStatus == 'FINISHED') {
      throw new BadRequestException(
        'Parking with given id have already finished',
      );
    }

    const user = await this.userService.findOne(userData.email);

    const parkingArea = await this.areaService.getAreaById(
      parkingService.parkingArea.id,
    );

    if (parkingService.user.id != user.id) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    const endTime = new Date();
    parkingService.endTime = endTime;
    parkingService.parkingStatus = ParkingStatusEnum.finished;
    const updatedParkingService = await this.parkingServiceRepository.save(
      parkingService,
    );

    const parkingFee = await this.countParkingFee(
      updatedParkingService.startTime,
      updatedParkingService.endTime,
      parkingArea.price,
    );

    const updateUserBalance = await this.userService.updateUserBalance(
      user.balance,
      parkingFee,
      user.email,
    );

    return {
      message: 'Your parking successfully ended',
      parkingFee: parkingFee + 'GEL',
      currentBalance: updateUserBalance + 'GEL',
    };
  }

  async getUserParkingHistory(userId: number, userData) {
    if (userId != userData.userId) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const queryBuilder = await this.parkingServiceRepository
      .createQueryBuilder('parkingService')
      .leftJoinAndSelect('parkingService.user', 'user')
      .where('parkingService.user = :userId', { userId })
      .getMany();

    return queryBuilder;
  }

  async getAllParkingServiceHisroty(filter?: 'finished' | 'inProgress') {
    const queryBuilder = await this.parkingServiceRepository.createQueryBuilder(
      'parkingService',
    );
    if (filter === 'finished') {
      queryBuilder.where('parkingService.parkingStatus = :status', {
        status: 'FINISHED',
      });
    } else if (filter === 'inProgress') {
      queryBuilder.where('parkingService.parkingStatus = :status', {
        status: 'IN_PROGRESS',
      });
    }

    return queryBuilder.getRawMany();
  }
}
