import { IsNumber } from 'class-validator';

export class StartParkingDto {
  @IsNumber()
  carId: number;
  @IsNumber()
  areaId: number;
}
