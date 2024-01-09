"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const car_entity_1 = require("./entities/car.entity");
const users_module_1 = require("./modules/users/users.module");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const auth_module_1 = require("./modules/auth/auth.module");
const auth_service_1 = require("./modules/auth/auth.service");
const jwt_strategy_1 = require("./modules/auth/jwt.strategy");
const cars_module_1 = require("./modules/cars/cars.module");
const parking_area_entyty_1 = require("./entities/parking-area.entyty");
const parking_area_module_1 = require("./modules/parking-area/parking-area.module");
const parking_service_entity_1 = require("./entities/parking-service.entity");
const parking_service_module_1 = require("./modules/parking-service/parking-service.module");
const password_reset_entity_1 = require("./entities/password-reset.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'Kvazimodo123',
                database: 'parking-app',
                entities: [user_entity_1.User, car_entity_1.Car, parking_area_entyty_1.ParkingArea, parking_service_entity_1.ParkingService, password_reset_entity_1.PasswordReset],
                synchronize: true,
            }),
            jwt_1.JwtModule.register({
                secret: 'jwtConstants.secret',
                signOptions: { expiresIn: '1h' },
            }),
            parking_service_module_1.ParkingServiceModule,
            parking_area_module_1.ParkingAreaModule,
            passport_1.PassportModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            cars_module_1.CarsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, auth_service_1.AuthService, jwt_strategy_1.JwtStrategy],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map