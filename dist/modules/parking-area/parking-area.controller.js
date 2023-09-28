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
exports.ParkingAreaController = void 0;
const common_1 = require("@nestjs/common");
const parking_area_service_1 = require("./parking-area.service");
const user_entity_1 = require("../../entities/user.entity");
const jwt_guard_1 = require("../auth/jwt.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const create_parkingArea_dto_1 = require("./dtos/create-parkingArea.dto");
const update_parkingArea_dto_1 = require("./dtos/update-parkingArea.dto");
const response_functions_utils_1 = require("../../utils/response-functions.utils");
let ParkingAreaController = class ParkingAreaController {
    constructor(parkingAreaService) {
        this.parkingAreaService = parkingAreaService;
    }
    async createParkingArea(createAreaDto, req) {
        try {
            const user = req.user;
            const result = await this.parkingAreaService.createParkingArea(createAreaDto, user);
            return (0, response_functions_utils_1.getSuccessMessage)(result, 'New area successfully created');
        }
        catch (err) {
            if (err instanceof common_1.BadRequestException) {
                return {
                    error: `Could not create new area with given params`,
                };
            }
            return (0, response_functions_utils_1.getErrorMessage)('Something went wrong!');
        }
    }
    async getCarById(areaId) {
        try {
            const result = await this.parkingAreaService.getAreaById(areaId);
            return (0, response_functions_utils_1.getSuccessMessage)(result);
        }
        catch (err) {
            if (err instanceof common_1.NotFoundException) {
                return {
                    error: `Area with id ${areaId} does not exsist`,
                };
            }
            return (0, response_functions_utils_1.getErrorMessage)('Something went wrong!');
        }
    }
    async updateCar(areaId, updateAreaDto) {
        try {
            const result = await this.parkingAreaService.updateArea(areaId, updateAreaDto);
            return (0, response_functions_utils_1.getSuccessMessage)(result, 'Area successfully updated');
        }
        catch (err) {
            return (0, response_functions_utils_1.getErrorMessage)('Something went wrong!');
        }
    }
    async getAllAreas() {
        try {
            const result = this.parkingAreaService.getAllAreas();
            return (0, response_functions_utils_1.getSuccessMessage)(result, 'Area successfully updated');
        }
        catch (err) {
            return (0, response_functions_utils_1.getErrorMessage)('Something went wrong!');
        }
    }
    async deleteCar(areaId) {
        try {
            const result = await this.parkingAreaService.deleteArea(areaId);
            return (0, response_functions_utils_1.getSuccessMessage)(result, 'Area successfully deleted');
        }
        catch (err) {
            if (err instanceof common_1.NotFoundException) {
                return {
                    error: `Area with id ${areaId} does not exsist`,
                };
            }
            return (0, response_functions_utils_1.getErrorMessage)('Something went wrong!');
        }
    }
};
exports.ParkingAreaController = ParkingAreaController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.Role.ADMIN),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_parkingArea_dto_1.CreateParkingAreaDto, Object]),
    __metadata("design:returntype", Promise)
], ParkingAreaController.prototype, "createParkingArea", null);
__decorate([
    (0, common_1.Get)(':areaId'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('areaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ParkingAreaController.prototype, "getCarById", null);
__decorate([
    (0, common_1.Patch)(':areaId'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('areaId')),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_parkingArea_dto_1.UpdateParkingAreaDto]),
    __metadata("design:returntype", Promise)
], ParkingAreaController.prototype, "updateCar", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.Role.ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ParkingAreaController.prototype, "getAllAreas", null);
__decorate([
    (0, common_1.Delete)(':areaId'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('areaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ParkingAreaController.prototype, "deleteCar", null);
exports.ParkingAreaController = ParkingAreaController = __decorate([
    (0, common_1.Controller)('parking-area'),
    __metadata("design:paramtypes", [parking_area_service_1.ParkingAreaService])
], ParkingAreaController);
//# sourceMappingURL=parking-area.controller.js.map