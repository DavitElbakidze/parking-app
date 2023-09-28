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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkingService = exports.ParkingStatusEnum = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const car_entity_1 = require("./car.entity");
const parking_area_entyty_1 = require("./parking-area.entyty");
var ParkingStatusEnum;
(function (ParkingStatusEnum) {
    ParkingStatusEnum["inProgress"] = "IN_PROGRESS";
    ParkingStatusEnum["finished"] = "FINISHED";
})(ParkingStatusEnum || (exports.ParkingStatusEnum = ParkingStatusEnum = {}));
let ParkingService = class ParkingService {
};
exports.ParkingService = ParkingService;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ParkingService.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ParkingService.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: true,
    }),
    __metadata("design:type", Date)
], ParkingService.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ParkingStatusEnum,
        default: ParkingStatusEnum.inProgress,
    }),
    __metadata("design:type", String)
], ParkingService.prototype, "parkingStatus", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { eager: true }),
    __metadata("design:type", user_entity_1.User)
], ParkingService.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => car_entity_1.Car, { eager: true }),
    __metadata("design:type", car_entity_1.Car)
], ParkingService.prototype, "car", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parking_area_entyty_1.ParkingArea, { eager: true }),
    __metadata("design:type", parking_area_entyty_1.ParkingArea)
], ParkingService.prototype, "parkingArea", void 0);
exports.ParkingService = ParkingService = __decorate([
    (0, typeorm_1.Entity)()
], ParkingService);
//# sourceMappingURL=parking-service.entity.js.map