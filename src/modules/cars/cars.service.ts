import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from 'src/entities/car.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateCarDto } from './dtos/create-car.dto';
import { User } from 'src/entities/user.entity';
import { UsersService } from '../users/users.service';
import { UpdateCarDto } from './dtos/update-car.dto';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
    private readonly userService: UsersService,
  ) {}

  async addCar(carDto: CreateCarDto, userData: User): Promise<Car | null> {
    const user = await this.userService.findOne(userData.email);
    const newCar = new Car();
    (newCar.mark = carDto.mark),
      (newCar.model = carDto.model),
      (newCar.color = carDto.color),
      (newCar.type = carDto.type),
      (newCar.numberPlate = carDto.numberPlate),
      (newCar.year = carDto.year),
      (newCar.user = user);
    const result = await this.carRepository.save(newCar);
    return result;
  }

  async getCarById(carId, userData: User): Promise<Car> {
    const user = await this.userService.findOne(userData.email);
    const car = await this.carRepository.findOne({
      where: { id: carId, user: user },
    });

    if (!car) {
      throw new NotFoundException(
        `Car with id ${carId} does not exsist or not belong to you`,
      );
    }
    return car;
  }

  async updateCar(
    carId,
    updateCarDto: UpdateCarDto,
    userData: User,
  ): Promise<UpdateResult> {
    const user = await this.userService.findOne(userData.email);
    const car = await this.carRepository.findOne({
      where: { id: carId, user: user },
    });
    if (!car) {
      throw new NotFoundException(
        `Car with id ${carId} does not exsist or not belong to you`,
      );
    }
    const updatedCar = await this.carRepository.update(
      { id: carId },
      updateCarDto,
    );
    return updatedCar;
  }

  async deleteCar(carId, userData): Promise<any> {
    const user = await this.userService.findOne(userData.email);
    const car = await this.carRepository.findOne({
      where: { id: carId, user: user },
    });

    if (!car) {
      throw new NotFoundException(
        `Car with id ${carId} does not exsist or not belong to you`,
      );
    }
    const result = await this.carRepository.delete(carId);

    return result;
  }
}
