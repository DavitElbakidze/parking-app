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
exports.CarsController = void 0;
const common_1 = require("@nestjs/common");
const cars_service_1 = require("./cars.service");
const jwt_guard_1 = require("../auth/jwt.guard");
const create_car_dto_1 = require("./dtos/create-car.dto");
const update_car_dto_1 = require("./dtos/update-car.dto");
const response_functions_utils_1 = require("../../utils/response-functions.utils");
let CarsController = class CarsController {
    constructor(carService) {
        this.carService = carService;
    }
    async addCar(req, carDto) {
        try {
            const user = req.user;
            const result = await this.carService.addCar(carDto, user);
            return (0, response_functions_utils_1.getSuccessMessage)(result, 'Car successfully created');
        }
        catch (err) {
            if (err instanceof common_1.BadRequestException) {
                return {
                    error: `Could not create new car with given params`,
                };
            }
            return (0, response_functions_utils_1.getErrorMessage)('Could not create new car with given params');
        }
    }
    async getCarById(carId, req) {
        try {
            const user = req.user;
            const result = await this.carService.getCarById(carId, user);
            return (0, response_functions_utils_1.getSuccessMessage)(result);
        }
        catch (err) {
            if (err instanceof common_1.NotFoundException) {
                return {
                    error: `Car with id ${carId} does not exsist or not belong to you`,
                };
            }
            return (0, response_functions_utils_1.getErrorMessage)('Something went wrong!');
        }
    }
    async updateCar(carId, req, updateCarDto) {
        try {
            const user = req.user;
            const result = await this.carService.updateCar(carId, updateCarDto, user);
            return (0, response_functions_utils_1.getSuccessMessage)(result, 'Car successfully updated');
        }
        catch (err) {
            if (err instanceof common_1.NotFoundException) {
                return {
                    error: `Car with id ${carId} does not exsist or not belong to you`,
                };
            }
            return (0, response_functions_utils_1.getErrorMessage)('Something went wrong!');
        }
    }
    async deleteCar(carId, req) {
        try {
            const user = req.user;
            const result = await this.carService.deleteCar(carId, user);
            return (0, response_functions_utils_1.getSuccessMessage)(result, 'Car successfully deleted');
        }
        catch (err) {
            if (err instanceof common_1.NotFoundException) {
                return {
                    error: `Car with id ${carId} does not exsist or not belong to you`,
                };
            }
            return (0, response_functions_utils_1.getErrorMessage)('Something went wrong!');
        }
    }
};
exports.CarsController = CarsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_car_dto_1.CreateCarDto]),
    __metadata("design:returntype", Promise)
], CarsController.prototype, "addCar", null);
__decorate([
    (0, common_1.Get)(':carId'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('carId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CarsController.prototype, "getCarById", null);
__decorate([
    (0, common_1.Patch)(':carId'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('carId')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, update_car_dto_1.UpdateCarDto]),
    __metadata("design:returntype", Promise)
], CarsController.prototype, "updateCar", null);
__decorate([
    (0, common_1.Delete)(':carId'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('carId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CarsController.prototype, "deleteCar", null);
exports.CarsController = CarsController = __decorate([
    (0, common_1.Controller)('cars'),
    __metadata("design:paramtypes", [cars_service_1.CarsService])
], CarsController);
//# sourceMappingURL=cars.controller.js.map