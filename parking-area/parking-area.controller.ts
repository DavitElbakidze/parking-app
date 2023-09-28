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
import { ParkingAreaService } from './parking-area.service';
import { Role } from 'src/entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateParkingAreaDto } from './dtos/create-parkingArea.dto';
import { UpdateParkingAreaDto } from './dtos/update-parkingArea.dto';
import {
  getErrorMessage,
  getSuccessMessage,
} from 'src/utils/response-functions.utils';
import { ErrorResponse } from 'src/utils/error-response.interface';
import { SuccessResponse } from 'src/utils/success-response.interface';

@Controller('parking-area')
export class ParkingAreaController {
  constructor(private readonly parkingAreaService: ParkingAreaService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async createParkingArea(
    @Body(new ValidationPipe()) createAreaDto: CreateParkingAreaDto,
    @Req() req,
  ): Promise<SuccessResponse | ErrorResponse> {
    try {
      const user = req.user;
      const result = await this.parkingAreaService.createParkingArea(
        createAreaDto,
        user,
      );
      return getSuccessMessage(result, 'New area successfully created');
    } catch (err) {
      if (err instanceof BadRequestException) {
        return {
          error: `Could not create new area with given params`,
        };
      }
      return getErrorMessage('Something went wrong!');
    }
  }

  @Get(':areaId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async getCarById(
    @Param('areaId') areaId: number,
  ): Promise<SuccessResponse | ErrorResponse> {
    try {
      const result = await this.parkingAreaService.getAreaById(areaId);
      return getSuccessMessage(result);
    } catch (err) {
      if (err instanceof NotFoundException) {
        return {
          error: `Area with id ${areaId} does not exsist`,
        };
      }
      return getErrorMessage('Something went wrong!');
    }
  }

  @Patch(':areaId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async updateCar(
    @Param('areaId') areaId: number,
    @Body(new ValidationPipe()) updateAreaDto: UpdateParkingAreaDto,
  ): Promise<SuccessResponse | ErrorResponse> {
    try {
      const result = await this.parkingAreaService.updateArea(
        areaId,
        updateAreaDto,
      );
      return getSuccessMessage(result, 'Area successfully updated');
    } catch (err) {
      return getErrorMessage('Something went wrong!');
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async getAllAreas(): Promise<SuccessResponse | ErrorResponse> {
    try {
      const result = this.parkingAreaService.getAllAreas();
      return getSuccessMessage(result, 'Area successfully updated');
    } catch (err) {
      return getErrorMessage('Something went wrong!');
    }
  }

  @Delete(':areaId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async deleteCar(
    @Param('areaId') areaId: number,
  ): Promise<SuccessResponse | ErrorResponse> {
    try {
      const result = await this.parkingAreaService.deleteArea(areaId);
      return getSuccessMessage(result, 'Area successfully deleted');
    } catch (err) {
      if (err instanceof NotFoundException) {
        return {
          error: `Area with id ${areaId} does not exsist`,
        };
      }
      return getErrorMessage('Something went wrong!');
    }
  }
}
