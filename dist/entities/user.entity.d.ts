import { Car } from './car.entity';
import { PasswordReset } from './password-reset.entity';
export declare enum Role {
    ADMIN = "admin",
    USER = "user"
}
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    IDNumber: string;
    phone: string;
    roles: Role;
    password: string;
    email: string;
    balance: number;
    createDate: Date;
    cars: Car[];
    passwordReset: PasswordReset[];
}
