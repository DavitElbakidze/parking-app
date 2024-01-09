import { AuthService } from './auth.service';
import { SignInDto } from './dtos/login.dto';
import { Role } from 'src/entities/user.entity';
import { UsersService } from '../users/users.service';
export declare class AuthController {
    private readonly usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService: AuthService);
    login(data: SignInDto): Promise<{
        status: string;
        message: string;
        data?: undefined;
    } | {
        status: string;
        data: {
            role: Role;
            email: string;
            jwtToken: {
                access_token: string;
            };
        };
        message?: undefined;
    }>;
    getProfile(req: any): any;
}
