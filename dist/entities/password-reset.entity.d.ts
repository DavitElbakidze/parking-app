import { User } from './user.entity';
export declare class PasswordReset {
    id: number;
    token: string;
    expirationDate: Date;
    user: User;
}
