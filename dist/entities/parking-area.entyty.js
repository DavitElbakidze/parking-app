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
exports.ParkingArea = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let ParkingArea = class ParkingArea {
};
exports.ParkingArea = ParkingArea;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ParkingArea.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { unique: true }),
    __metadata("design:type", String)
], ParkingArea.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], ParkingArea.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], ParkingArea.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], ParkingArea.prototype, "user", void 0);
exports.ParkingArea = ParkingArea = __decorate([
    (0, typeorm_1.Entity)()
], ParkingArea);
//# sourceMappingURL=parking-area.entyty.js.map