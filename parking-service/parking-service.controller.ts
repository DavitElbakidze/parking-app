import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ParkingServiceService } from './parking-service.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { StartParkingDto } from './dtos/startParking.dto';
import { Roles } from '../auth/roles.decorator';
import { Role } from 'src/entities/user.entity';
import { RolesGuard } from '../auth/roles.guard';
import {
  getErrorMessage,
  getSuccessMessage,
} from 'src/utils/response-functions.utils';
import { ErrorResponse } from 'src/utils/error-response.interface';
import { SuccessResponse } from 'src/utils/success-response.interface';

@Controller('parking-service')
export class ParkingServiceController {
  constructor(private readonly parkingService: ParkingServiceService) {}

  @Post('start')
  @UseGuards(JwtAuthGuard)
  async startParking(
    @Req() req,
    @Body(new ValidationPipe()) startParkingDto: StartParkingDto,
  ): Promise<SuccessResponse | ErrorResponse> {
    try {
      const user = req.user;
      const result = await this.parkingService.startParking(
        startParkingDto,
        user,
      );
      return getSuccessMessage(result, 'Your parking successfully started');
    } catch (err) {
      return getErrorMessage('Something went wrong!');
    }
  }

  @Patch('end/:parkingServiceId')
  @UseGuards(JwtAuthGuard)
  async endParking(
    @Param('parkingServiceId') parkingServiceId: number,
    @Req() req,
  ): Promise<SuccessResponse | ErrorResponse> {
    try {
      const user = req.user;
      const result = await this.parkingService.endParking(
        parkingServiceId,
        user,
      );
      return getSuccessMessage(result, 'Your parking successfully ended');
    } catch (err) {
      if (err instanceof BadRequestException) {
        return {
          error: `This parking has already finished`,
        };
      }
      return getErrorMessage('Something went wrong!');
    }
  }

  @Get('user-parking-history/:userId')
  @UseGuards(JwtAuthGuard)
  async getUserParkingHistory(
    @Param('userId') userId: number,
    @Req() req,
  ): Promise<SuccessResponse | ErrorResponse> {
    try {
      const user = req.user;
      const result = await this.parkingService.getUserParkingHistory(
        userId,
        user,
      );
      return getSuccessMessage(result);
    } catch (err) {
      if (err instanceof HttpException) {
        return {
          error: `Forbidden`,
        };
      }
      return getErrorMessage('Something went wrong!');
    }
  }

  @Get('admin-parking-history')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async getAllParkingService(
    @Query('filter') filter?: 'finished' | 'inProgress',
  ): Promise<SuccessResponse | ErrorResponse> {
    try {
      const result = await this.parkingService.getAllParkingServiceHisroty(
        filter,
      );
      return getSuccessMessage(result);
    } catch (err) {
      return getErrorMessage('Something went wrong!');
    }
  }
}
