import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { SuccessResponse } from 'src/utils/success-response.interface';
import { ErrorResponse } from 'src/utils/error-response.interface';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    createUser(userDto: CreateUserDto): Promise<SuccessResponse | ErrorResponse>;
}
