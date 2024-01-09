import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCarDto {
  @IsString()
  mark: string;
  @IsString()
  model: string;
  @IsString()
  type: string;
  @IsNumber()
  year: number;
  @IsString()
  @MaxLength(7)
  @MinLength(7)
  numberPlate: string;
  @IsString()
  color: string;
}
