"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkingServiceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const parking_service_entity_1 = require("../../entities/parking-service.entity");
const typeorm_2 = require("typeorm");
const users_service_1 = require("../users/users.service");
const cars_service_1 = require("../cars/cars.service");
const parking_area_service_1 = require("../parking-area/parking-area.service");
let ParkingServiceService = class ParkingServiceService {
    constructor(parkingServiceRepository, userService, carService, areaService) {
        this.parkingServiceRepository = parkingServiceRepository;
        this.userService = userService;
        this.carService = carService;
        this.areaService = areaService;
    }
    async checkInProgresParking(userId, userData) {
        if (userId != userData.userId) {
            throw new common_1.HttpException('Forbidden', common_1.HttpStatus.FORBIDDEN);
        }
        const queryBuilder = await this.parkingServiceRepository
            .createQueryBuilder('parkingService')
            .leftJoinAndSelect('parkingService.user', 'user')
            .where('parkingService.user = :userId', { userId })
            .andWhere('parkingService.parkingStatus = "IN_PROGRESS"')
            .getMany();
        return queryBuilder;
    }
    async startParking(startParkingDto, userData) {
        const user = await this.userService.findOne(userData.email);
        const car = await this.carService.getCarById(startParkingDto.carId, user);
        const area = await this.areaService.getAreaById(startParkingDto.areaId);
        const checkInProgresParking = await this.checkInProgresParking(user.id, userData);
        if (checkInProgresParking.length > 0) {
            throw new common_1.BadRequestException('User is already on parking');
        }
        const startParking = new parking_service_entity_1.ParkingService();
        (startParking.car = car),
            (startParking.parkingArea = area),
            (startParking.user = user),
            (startParking.endTime = null);
        const result = await this.parkingServiceRepository.save(startParking);
        return result;
    }
    async getServiceById(serviceId) {
        const parkingService = await this.parkingServiceRepository.findOne({
            where: { id: serviceId },
        });
        if (!parkingService) {
            throw new common_1.NotFoundException('Service not found');
        }
        return parkingService;
    }
    async countParkingFee(startTime, endTime, hourlyPrice) {
        const milisecondsBetween = endTime.getTime() - startTime.getTime();
        const timeDifference = milisecondsBetween / (1000 * 60 * 60);
        const parkingFee = parseFloat(timeDifference.toFixed(1)) * hourlyPrice;
        return parkingFee;
    }
    async endParking(parkingServiceId, userData) {
        const parkingService = await this.getServiceById(parkingServiceId);
        if (parkingService.parkingStatus == 'FINISHED') {
            throw new common_1.BadRequestException('Parking with given id have already finished');
        }
        const user = await this.userService.findOne(userData.email);
        const parkingArea = await this.areaService.getAreaById(parkingService.parkingArea.id);
        if (parkingService.user.id != user.id) {
            throw new common_1.HttpException('Forbidden', common_1.HttpStatus.FORBIDDEN);
        }
        const endTime = new Date();
        parkingService.endTime = endTime;
        parkingService.parkingStatus = parking_service_entity_1.ParkingStatusEnum.finished;
        const updatedParkingService = await this.parkingServiceRepository.save(parkingService);
        const parkingFee = await this.countParkingFee(updatedParkingService.startTime, updatedParkingService.endTime, parkingArea.price);
        const updateUserBalance = await this.userService.updateUserBalance(user.balance, parkingFee, user.email);
        return {
            message: 'Your parking successfully ended',
            parkingFee: parkingFee + 'GEL',
            currentBalance: updateUserBalance + 'GEL',
        };
    }
    async getUserParkingHistory(userId, userData) {
        if (userId != userData.userId) {
            throw new common_1.HttpException('Forbidden', common_1.HttpStatus.FORBIDDEN);
        }
        const queryBuilder = await this.parkingServiceRepository
            .createQueryBuilder('parkingService')
            .leftJoinAndSelect('parkingService.user', 'user')
            .where('parkingService.user = :userId', { userId })
            .getMany();
        return queryBuilder;
    }
    async getAllParkingServiceHisroty(filter) {
        const queryBuilder = await this.parkingServiceRepository.createQueryBuilder('parkingService');
        if (filter === 'finished') {
            queryBuilder.where('parkingService.parkingStatus = :status', {
                status: 'FINISHED',
            });
        }
        else if (filter === 'inProgress') {
            queryBuilder.where('parkingService.parkingStatus = :status', {
                status: 'IN_PROGRESS',
            });
        }
        return queryBuilder.getRawMany();
    }
};
exports.ParkingServiceService = ParkingServiceService;
exports.ParkingServiceService = ParkingServiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(parking_service_entity_1.ParkingService)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        cars_service_1.CarsService,
        parking_area_service_1.ParkingAreaService])
], ParkingServiceService);
//# sourceMappingURL=parking-service.service.js.map