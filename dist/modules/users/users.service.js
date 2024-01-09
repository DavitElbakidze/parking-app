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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../entities/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createUser(userDto) {
        const { password, ...userDtoWithoutPassword } = userDto;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = {
            ...userDtoWithoutPassword,
            password: hashedPassword,
            balance: 100,
            roles: user_entity_1.Role.USER,
            createDate: new Date(),
        };
        return this.userRepository.save(user);
    }
    async findOne(email) {
        return await this.userRepository.findOne({ where: { email } });
    }
    async updateUserBalance(currentBallance, parkingFee, userEmail) {
        const user = await this.findOne(userEmail);
        if (currentBallance < parkingFee) {
            throw new common_1.BadRequestException('You have not enough money on your balance, Please fill it');
        }
        const newBalance = currentBallance - parkingFee;
        user.balance = newBalance;
        const updatetBalance = await this.userRepository.save(user);
        return updatetBalance.balance;
    }
    async findUserByEmailAndPassword(email, password) {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    email,
                },
            });
            if (!user) {
                return null;
            }
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (isPasswordCorrect) {
                return user;
            }
            else {
                return null;
            }
        }
        catch (err) {
            return null;
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map