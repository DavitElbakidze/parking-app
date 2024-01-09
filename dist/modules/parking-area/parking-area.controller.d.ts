import { ParkingAreaService } from './parking-area.service';
import { CreateParkingAreaDto } from './dtos/create-parkingArea.dto';
import { UpdateParkingAreaDto } from './dtos/update-parkingArea.dto';
import { ErrorResponse } from 'src/utils/error-response.interface';
import { SuccessResponse } from 'src/utils/success-response.interface';
export declare class ParkingAreaController {
    private readonly parkingAreaService;
    constructor(parkingAreaService: ParkingAreaService);
    createParkingArea(createAreaDto: CreateParkingAreaDto, req: any): Promise<SuccessResponse | ErrorResponse>;
    getCarById(areaId: number): Promise<SuccessResponse | ErrorResponse>;
    updateCar(areaId: number, updateAreaDto: UpdateParkingAreaDto): Promise<SuccessResponse | ErrorResponse>;
    getAllAreas(): Promise<SuccessResponse | ErrorResponse>;
    deleteCar(areaId: number): Promise<SuccessResponse | ErrorResponse>;
}
