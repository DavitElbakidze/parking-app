import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CreateCarDto } from './dtos/create-car.dto';
import { UpdateCarDto } from './dtos/update-car.dto';
import {
  getErrorMessage,
  getSuccessMessage,
} from 'src/utils/response-functions.utils';
import { SuccessResponse } from 'src/utils/success-response.interface';
import { ErrorResponse } from 'src/utils/error-response.interface';

@Controller('cars')
export class CarsController {
  constructor(private readonly carService: CarsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async addCar(
    @Req() req,
    @Body(new ValidationPipe()) carDto: CreateCarDto,
  ): Promise<SuccessResponse | ErrorResponse> {
    try {
      const user = req.user;
      const result = await this.carService.addCar(carDto, user);
      return getSuccessMessage(result, 'Car successfully created');
    } catch (err) {
      if (err instanceof BadRequestException) {
        return {
          error: `Could not create new car with given params`,
        };
      }
      return getErrorMessage('Could not create new car with given params');
    }
  }

  @Get(':carId')
  @UseGuards(JwtAuthGuard)
  async getCarById(
    @Param('carId') carId: number,
    @Req() req,
  ): Promise<SuccessResponse | ErrorResponse> {
    try {
      const user = req.user;
      const result = await this.carService.getCarById(carId, user);
      return getSuccessMessage(result);
    } catch (err) {
      if (err instanceof NotFoundException) {
        return {
          error: `Car with id ${carId} does not exsist or not belong to you`,
        };
      }
      return getErrorMessage('Something went wrong!');
    }
  }

  @Patch(':carId')
  @UseGuards(JwtAuthGuard)
  async updateCar(
    @Param('carId') carId: number,
    @Req() req,
    @Body(new ValidationPipe()) updateCarDto: UpdateCarDto,
  ): Promise<SuccessResponse | ErrorResponse> {
    try {
      const user = req.user;
      const result = await this.carService.updateCar(carId, updateCarDto, user);
      return getSuccessMessage(result, 'Car successfully updated');
    } catch (err) {
      if (err instanceof NotFoundException) {
        return {
          error: `Car with id ${carId} does not exsist or not belong to you`,
        };
      }
      return getErrorMessage('Something went wrong!');
    }
  }

  @Delete(':carId')
  @UseGuards(JwtAuthGuard)
  async deleteCar(
    @Param('carId') carId: number,
    @Req() req,
  ): Promise<SuccessResponse | ErrorResponse> {
    try {
      const user = req.user;
      const result = await this.carService.deleteCar(carId, user);
      return getSuccessMessage(result, 'Car successfully deleted');
    } catch (err) {
      if (err instanceof NotFoundException) {
        return {
          error: `Car with id ${carId} does not exsist or not belong to you`,
        };
      }
      return getErrorMessage('Something went wrong!');
    }
  }
}
