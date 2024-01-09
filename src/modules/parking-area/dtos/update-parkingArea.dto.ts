import { IsNumber, IsString } from 'class-validator';

export class UpdateParkingAreaDto {
  @IsString()
  name?: string;
  @IsString()
  address?: string;
  @IsNumber()
  price?: number;
}
