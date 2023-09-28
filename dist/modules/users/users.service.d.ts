import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/createUser.dto';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    createUser(userDto: CreateUserDto): Promise<User>;
    findOne(email: string): Promise<User>;
    updateUserBalance(currentBallance: any, parkingFee: any, userEmail: any): Promise<number>;
    findUserByEmailAndPassword(email: string, password: string): Promise<User>;
}
