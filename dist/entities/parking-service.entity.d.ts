import { User } from './user.entity';
import { Car } from './car.entity';
import { ParkingArea } from './parking-area.entyty';
export declare enum ParkingStatusEnum {
    inProgress = "IN_PROGRESS",
    finished = "FINISHED"
}
export declare class ParkingService {
    id: number;
    startTime: Date;
    endTime: Date;
    parkingStatus: ParkingStatusEnum;
    user: User;
    car: Car;
    parkingArea: ParkingArea;
}
