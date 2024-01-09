import { PasswordReset } from 'src/entities/password-reset.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
export declare class PasswordResetService {
    private readonly userRepository;
    private readonly userService;
    private readonly passwordResetRepository;
    constructor(userRepository: Repository<User>, userService: UsersService, passwordResetRepository: Repository<PasswordReset>);
    private generateUniqueToken;
    sendPasswordResetEmail(email: string, token: string): Promise<void>;
    requsetToReset(email: string): Promise<void>;
    resetPassword(token: any, newPassword: any): Promise<void>;
}
