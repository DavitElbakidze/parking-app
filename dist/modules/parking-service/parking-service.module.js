"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkingServiceModule = void 0;
const common_1 = require("@nestjs/common");
const parking_service_controller_1 = require("./parking-service.controller");
const parking_service_service_1 = require("./parking-service.service");
const typeorm_1 = require("@nestjs/typeorm");
const parking_service_entity_1 = require("../../entities/parking-service.entity");
const users_module_1 = require("../users/users.module");
const cars_module_1 = require("../cars/cars.module");
const parking_area_module_1 = require("../parking-area/parking-area.module");
let ParkingServiceModule = class ParkingServiceModule {
};
exports.ParkingServiceModule = ParkingServiceModule;
exports.ParkingServiceModule = ParkingServiceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([parking_service_entity_1.ParkingService]),
            users_module_1.UsersModule,
            cars_module_1.CarsModule,
            parking_area_module_1.ParkingAreaModule,
        ],
        controllers: [parking_service_controller_1.ParkingServiceController],
        providers: [parking_service_service_1.ParkingServiceService],
    })
], ParkingServiceModule);
//# sourceMappingURL=parking-service.module.js.map