import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingArea } from 'src/entities/parking-area.entyty';
import { Repository, UpdateResult } from 'typeorm';
import { UsersService } from '../users/users.service';
import { User } from 'src/entities/user.entity';

@Injectable()
export class ParkingAreaService {
  constructor(
    @InjectRepository(ParkingArea)
    private readonly parkingAreaRepository: Repository<ParkingArea>,
    private readonly userService: UsersService,
  ) {}

  async createParkingArea(createAreaDto, userData): Promise<ParkingArea> {
    const user = await this.userService.findOne(userData.email);
    const newArea = new ParkingArea();
    newArea.name = createAreaDto.name;
    newArea.address = createAreaDto.address;
    newArea.price = createAreaDto.price;
    newArea.user = user;

    const createdArea = await this.parkingAreaRepository.save(newArea);
    return createdArea;
  }

  async getAreaById(areaId): Promise<ParkingArea> {
    const area = await this.parkingAreaRepository.findOne({
      where: { id: areaId },
    });
    if (!area) {
      throw new NotFoundException('Area not found');
    }

    return area;
  }

  async getAllAreas(): Promise<ParkingArea[]> {
    return this.parkingAreaRepository.find();
  }

  async updateArea(areaId, updateAreaDto): Promise<UpdateResult> {
    const updatedArea = await this.parkingAreaRepository.update(
      { id: areaId },
      updateAreaDto,
    );
    return updatedArea;
  }

  async deleteArea(areaId): Promise<any> {
    const area = await this.parkingAreaRepository.findOne({
      where: { id: areaId },
    });
    if (!area) {
      throw new NotFoundException('Area not found');
    }
    const result = await this.parkingAreaRepository.delete(areaId);
    return result;
  }
}
