import { Role } from 'src/entities/user.entity';
export declare class CreateUserDto {
    firstName: string;
    lastName: string;
    IDNumber: string;
    phone: string;
    address: string;
    email: string;
    role: Role;
    password: string;
}
