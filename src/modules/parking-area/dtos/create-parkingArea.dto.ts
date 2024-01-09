import { IsNumber, IsString } from 'class-validator';

export class CreateParkingAreaDto {
  @IsString()
  name: string;
  @IsString()
  address: string;
  @IsNumber()
  price: number;
}
