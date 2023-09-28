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
exports.ParkingServiceController = void 0;
const common_1 = require("@nestjs/common");
const parking_service_service_1 = require("./parking-service.service");
const jwt_guard_1 = require("../auth/jwt.guard");
const startParking_dto_1 = require("./dtos/startParking.dto");
const roles_decorator_1 = require("../auth/roles.decorator");
const user_entity_1 = require("../../entities/user.entity");
const roles_guard_1 = require("../auth/roles.guard");
const response_functions_utils_1 = require("../../utils/response-functions.utils");
let ParkingServiceController = class ParkingServiceController {
    constructor(parkingService) {
        this.parkingService = parkingService;
    }
    async startParking(req, startParkingDto) {
        try {
            const user = req.user;
            const result = await this.parkingService.startParking(startParkingDto, user);
            return (0, response_functions_utils_1.getSuccessMessage)(result, 'Your parking successfully started');
        }
        catch (err) {
            return (0, response_functions_utils_1.getErrorMessage)('Something went wrong!');
        }
    }
    async endParking(parkingServiceId, req) {
        try {
            const user = req.user;
            const result = await this.parkingService.endParking(parkingServiceId, user);
            return (0, response_functions_utils_1.getSuccessMessage)(result, 'Your parking successfully ended');
        }
        catch (err) {
            if (err instanceof common_1.BadRequestException) {
                return {
                    error: `This parking has already finished`,
                };
            }
            return (0, response_functions_utils_1.getErrorMessage)('Something went wrong!');
        }
    }
    async getUserParkingHistory(userId, req) {
        try {
            const user = req.user;
            const result = await this.parkingService.getUserParkingHistory(userId, user);
            return (0, response_functions_utils_1.getSuccessMessage)(result);
        }
        catch (err) {
            if (err instanceof common_1.HttpException) {
                return {
                    error: `Forbidden`,
                };
            }
            return (0, response_functions_utils_1.getErrorMessage)('Something went wrong!');
        }
    }
    async getAllParkingService(filter) {
        try {
            const result = await this.parkingService.getAllParkingServiceHisroty(filter);
            return (0, response_functions_utils_1.getSuccessMessage)(result);
        }
        catch (err) {
            return (0, response_functions_utils_1.getErrorMessage)('Something went wrong!');
        }
    }
};
exports.ParkingServiceController = ParkingServiceController;
__decorate([
    (0, common_1.Post)('start'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, startParking_dto_1.StartParkingDto]),
    __metadata("design:returntype", Promise)
], ParkingServiceController.prototype, "startParking", null);
__decorate([
    (0, common_1.Patch)('end/:parkingServiceId'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('parkingServiceId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ParkingServiceController.prototype, "endParking", null);
__decorate([
    (0, common_1.Get)('user-parking-history/:userId'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ParkingServiceController.prototype, "getUserParkingHistory", null);
__decorate([
    (0, common_1.Get)('admin-parking-history'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.Role.ADMIN),
    __param(0, (0, common_1.Query)('filter')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ParkingServiceController.prototype, "getAllParkingService", null);
exports.ParkingServiceController = ParkingServiceController = __decorate([
    (0, common_1.Controller)('parking-service'),
    __metadata("design:paramtypes", [parking_service_service_1.ParkingServiceService])
], ParkingServiceController);
//# sourceMappingURL=parking-service.controller.js.map