import { ParkingService } from 'src/entities/parking-service.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CarsService } from '../cars/cars.service';
import { ParkingAreaService } from '../parking-area/parking-area.service';
import { User } from 'src/entities/user.entity';
import { StartParkingDto } from './dtos/startParking.dto';
export declare class ParkingServiceService {
    private readonly parkingServiceRepository;
    private readonly userService;
    private readonly carService;
    private readonly areaService;
    constructor(parkingServiceRepository: Repository<ParkingService>, userService: UsersService, carService: CarsService, areaService: ParkingAreaService);
    checkInProgresParking(userId: number, userData: any): Promise<ParkingService[]>;
    startParking(startParkingDto: StartParkingDto, userData: any): Promise<ParkingService>;
    getServiceById(serviceId: any): Promise<ParkingService>;
    countParkingFee(startTime: any, endTime: any, hourlyPrice: any): Promise<number>;
    endParking(parkingServiceId: number, userData: User): Promise<{
        message: string;
        parkingFee: string;
        currentBalance: string;
    }>;
    getUserParkingHistory(userId: number, userData: any): Promise<ParkingService[]>;
    getAllParkingServiceHisroty(filter?: 'finished' | 'inProgress'): Promise<any[]>;
}
