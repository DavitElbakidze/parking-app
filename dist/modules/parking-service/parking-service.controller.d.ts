import { ParkingServiceService } from './parking-service.service';
import { StartParkingDto } from './dtos/startParking.dto';
import { ErrorResponse } from 'src/utils/error-response.interface';
import { SuccessResponse } from 'src/utils/success-response.interface';
export declare class ParkingServiceController {
    private readonly parkingService;
    constructor(parkingService: ParkingServiceService);
    startParking(req: any, startParkingDto: StartParkingDto): Promise<SuccessResponse | ErrorResponse>;
    endParking(parkingServiceId: number, req: any): Promise<SuccessResponse | ErrorResponse>;
    getUserParkingHistory(userId: number, req: any): Promise<SuccessResponse | ErrorResponse>;
    getAllParkingService(filter?: 'finished' | 'inProgress'): Promise<SuccessResponse | ErrorResponse>;
}
