import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from 'src/entities/user.entity';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsString()
  @MaxLength(11)
  @MinLength(11)
  IDNumber: string;

  @IsPhoneNumber('GE', { message: 'Invalid phone number' })
  phone: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsEmail()
  email: string;

  @IsEnum(Role)
  @IsOptional()
  role: Role;

  @IsString()
  password: string;

  // @IsNumber()
  // balance: number;
}
