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
exports.PasswordResetService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const password_reset_entity_1 = require("../../entities/password-reset.entity");
const user_entity_1 = require("../../entities/user.entity");
const typeorm_2 = require("typeorm");
const users_service_1 = require("../users/users.service");
const crypto_1 = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt_1 = require("bcrypt");
let PasswordResetService = class PasswordResetService {
    constructor(userRepository, userService, passwordResetRepository) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.passwordResetRepository = passwordResetRepository;
    }
    generateUniqueToken() {
        const tokenLength = 32;
        return (0, crypto_1.randomBytes)(tokenLength).toString('hex');
    }
    async sendPasswordResetEmail(email, token) {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'ddaviid1995@gmail.com',
                pass: 'xqtf ufrg rmgb xdpa',
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
        const mailOptions = {
            from: 'ddaviid1995@gmail.com',
            to: email,
            subject: 'Password Reset Request',
            text: `Thttp://localhost:3000/password-reset/request${token}`,
        };
        await transporter.sendMail(mailOptions);
    }
    async requsetToReset(email) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const token = this.generateUniqueToken();
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 1);
        const passwordReset = new password_reset_entity_1.PasswordReset();
        passwordReset.token = token;
        passwordReset.expirationDate = expirationDate;
        passwordReset.user = user;
        await this.passwordResetRepository.save(passwordReset);
        await this.sendPasswordResetEmail(user.email, token);
    }
    async resetPassword(token, newPassword) {
        const passwordReset = await this.passwordResetRepository
            .createQueryBuilder('passwordReset')
            .leftJoinAndSelect('passwordReset.user', 'user')
            .where('passwordReset.token = :token', { token })
            .getOne();
        if (passwordReset.expirationDate <= new Date()) {
            throw new common_1.NotFoundException('Password reset token has expired');
        }
        const user = passwordReset.user;
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const hashedPassword = await (0, bcrypt_1.hash)(newPassword, 10);
        user.password = hashedPassword;
        await this.userRepository.save(user);
        await this.passwordResetRepository.remove(passwordReset);
    }
};
exports.PasswordResetService = PasswordResetService;
exports.PasswordResetService = PasswordResetService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(password_reset_entity_1.PasswordReset)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        typeorm_2.Repository])
], PasswordResetService);
//# sourceMappingURL=password-reset.service.js.map