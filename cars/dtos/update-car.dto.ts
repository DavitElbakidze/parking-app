import {
  IsString,
  IsInt,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateCarDto {
  @IsString({ each: true })
  @IsOptional()
  mark?: string;

  @IsString({ each: true })
  @IsOptional()
  model?: string;

  @IsString({ each: true })
  @IsOptional()
  type?: string;

  @IsInt()
  @IsOptional()
  year?: number;

  @IsString({ each: true })
  @IsOptional()
  @MaxLength(7)
  @MinLength(7)
  numberPlate?: string;

  @IsString({ each: true })
  @IsOptional()
  color?: string;
}
