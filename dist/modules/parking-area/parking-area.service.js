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
exports.ParkingAreaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const parking_area_entyty_1 = require("../../entities/parking-area.entyty");
const typeorm_2 = require("typeorm");
const users_service_1 = require("../users/users.service");
let ParkingAreaService = class ParkingAreaService {
    constructor(parkingAreaRepository, userService) {
        this.parkingAreaRepository = parkingAreaRepository;
        this.userService = userService;
    }
    async createParkingArea(createAreaDto, userData) {
        const user = await this.userService.findOne(userData.email);
        const newArea = new parking_area_entyty_1.ParkingArea();
        newArea.name = createAreaDto.name;
        newArea.address = createAreaDto.address;
        newArea.price = createAreaDto.price;
        newArea.user = user;
        const createdArea = await this.parkingAreaRepository.save(newArea);
        return createdArea;
    }
    async getAreaById(areaId) {
        const area = await this.parkingAreaRepository.findOne({
            where: { id: areaId },
        });
        if (!area) {
            throw new common_1.NotFoundException('Area not found');
        }
        return area;
    }
    async getAllAreas() {
        return this.parkingAreaRepository.find();
    }
    async updateArea(areaId, updateAreaDto) {
        const updatedArea = await this.parkingAreaRepository.update({ id: areaId }, updateAreaDto);
        return updatedArea;
    }
    async deleteArea(areaId) {
        const area = await this.parkingAreaRepository.findOne({
            where: { id: areaId },
        });
        if (!area) {
            throw new common_1.NotFoundException('Area not found');
        }
        const result = await this.parkingAreaRepository.delete(areaId);
        return result;
    }
};
exports.ParkingAreaService = ParkingAreaService;
exports.ParkingAreaService = ParkingAreaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(parking_area_entyty_1.ParkingArea)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], ParkingAreaService);
//# sourceMappingURL=parking-area.service.js.map