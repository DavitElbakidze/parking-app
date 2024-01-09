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
exports.CarsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const car_entity_1 = require("../../entities/car.entity");
const typeorm_2 = require("typeorm");
const users_service_1 = require("../users/users.service");
let CarsService = class CarsService {
    constructor(carRepository, userService) {
        this.carRepository = carRepository;
        this.userService = userService;
    }
    async addCar(carDto, userData) {
        const user = await this.userService.findOne(userData.email);
        const newCar = new car_entity_1.Car();
        (newCar.mark = carDto.mark),
            (newCar.model = carDto.model),
            (newCar.color = carDto.color),
            (newCar.type = carDto.type),
            (newCar.numberPlate = carDto.numberPlate),
            (newCar.year = carDto.year),
            (newCar.user = user);
        const result = await this.carRepository.save(newCar);
        return result;
    }
    async getCarById(carId, userData) {
        const user = await this.userService.findOne(userData.email);
        const car = await this.carRepository.findOne({
            where: { id: carId, user: user },
        });
        if (!car) {
            throw new common_1.NotFoundException(`Car with id ${carId} does not exsist or not belong to you`);
        }
        return car;
    }
    async updateCar(carId, updateCarDto, userData) {
        const user = await this.userService.findOne(userData.email);
        const car = await this.carRepository.findOne({
            where: { id: carId, user: user },
        });
        if (!car) {
            throw new common_1.NotFoundException(`Car with id ${carId} does not exsist or not belong to you`);
        }
        const updatedCar = await this.carRepository.update({ id: carId }, updateCarDto);
        return updatedCar;
    }
    async deleteCar(carId, userData) {
        const user = await this.userService.findOne(userData.email);
        const car = await this.carRepository.findOne({
            where: { id: carId, user: user },
        });
        if (!car) {
            throw new common_1.NotFoundException(`Car with id ${carId} does not exsist or not belong to you`);
        }
        const result = await this.carRepository.delete(carId);
        return result;
    }
};
exports.CarsService = CarsService;
exports.CarsService = CarsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(car_entity_1.Car)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], CarsService);
//# sourceMappingURL=cars.service.js.map