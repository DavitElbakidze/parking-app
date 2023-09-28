import { ParkingArea } from 'src/entities/parking-area.entyty';
import { Repository, UpdateResult } from 'typeorm';
import { UsersService } from '../users/users.service';
export declare class ParkingAreaService {
    private readonly parkingAreaRepository;
    private readonly userService;
    constructor(parkingAreaRepository: Repository<ParkingArea>, userService: UsersService);
    createParkingArea(createAreaDto: any, userData: any): Promise<ParkingArea>;
    getAreaById(areaId: any): Promise<ParkingArea>;
    getAllAreas(): Promise<ParkingArea[]>;
    updateArea(areaId: any, updateAreaDto: any): Promise<UpdateResult>;
    deleteArea(areaId: any): Promise<any>;
}
