import { CarsService } from './cars.service';
import { CreateCarDto } from './dtos/create-car.dto';
import { UpdateCarDto } from './dtos/update-car.dto';
import { SuccessResponse } from 'src/utils/success-response.interface';
import { ErrorResponse } from 'src/utils/error-response.interface';
export declare class CarsController {
    private readonly carService;
    constructor(carService: CarsService);
    addCar(req: any, carDto: CreateCarDto): Promise<SuccessResponse | ErrorResponse>;
    getCarById(carId: number, req: any): Promise<SuccessResponse | ErrorResponse>;
    updateCar(carId: number, req: any, updateCarDto: UpdateCarDto): Promise<SuccessResponse | ErrorResponse>;
    deleteCar(carId: number, req: any): Promise<SuccessResponse | ErrorResponse>;
}
