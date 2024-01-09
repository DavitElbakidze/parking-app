import { Car } from 'src/entities/car.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateCarDto } from './dtos/create-car.dto';
import { User } from 'src/entities/user.entity';
import { UsersService } from '../users/users.service';
import { UpdateCarDto } from './dtos/update-car.dto';
export declare class CarsService {
    private readonly carRepository;
    private readonly userService;
    constructor(carRepository: Repository<Car>, userService: UsersService);
    addCar(carDto: CreateCarDto, userData: User): Promise<Car | null>;
    getCarById(carId: any, userData: User): Promise<Car>;
    updateCar(carId: any, updateCarDto: UpdateCarDto, userData: User): Promise<UpdateResult>;
    deleteCar(carId: any, userData: any): Promise<any>;
}
