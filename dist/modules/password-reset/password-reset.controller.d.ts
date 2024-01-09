import { PasswordResetService } from './password-reset.service';
export declare class PasswordResetController {
    private readonly passwordResetService;
    constructor(passwordResetService: PasswordResetService);
    requestPasswordReset(data: {
        email: string;
    }): Promise<void>;
    resetPassword(data: {
        token: string;
        newPassword: string;
    }): Promise<void>;
}
