import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<User> {
    const { password, ...userDtoWithoutPassword } = userDto;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = {
      ...userDtoWithoutPassword,
      password: hashedPassword,
      balance: 100,
      roles: Role.USER,
      createDate: new Date(),
    };

    return this.userRepository.save(user);
  }

  async findOne(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async updateUserBalance(currentBallance, parkingFee, userEmail) {
    const user = await this.findOne(userEmail);
    if (currentBallance < parkingFee) {
      throw new BadRequestException(
        'You have not enough money on your balance, Please fill it',
      );
    }
    const newBalance = currentBallance - parkingFee;
    user.balance = newBalance;
    const updatetBalance = await this.userRepository.save(user);
    return updatetBalance.balance;
  }

  async findUserByEmailAndPassword(email: string, password: string) {
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
      } else {
        return null;
      }
    } catch (err) {
      return null;
    }
  }
}
