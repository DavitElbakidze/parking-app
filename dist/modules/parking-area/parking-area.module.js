"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkingAreaModule = void 0;
const common_1 = require("@nestjs/common");
const parking_area_service_1 = require("./parking-area.service");
const parking_area_controller_1 = require("./parking-area.controller");
const parking_area_entyty_1 = require("../../entities/parking-area.entyty");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("../users/users.module");
let ParkingAreaModule = class ParkingAreaModule {
};
exports.ParkingAreaModule = ParkingAreaModule;
exports.ParkingAreaModule = ParkingAreaModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([parking_area_entyty_1.ParkingArea]), users_module_1.UsersModule],
        providers: [parking_area_service_1.ParkingAreaService],
        controllers: [parking_area_controller_1.ParkingAreaController],
        exports: [parking_area_service_1.ParkingAreaService],
    })
], ParkingAreaModule);
//# sourceMappingURL=parking-area.module.js.map