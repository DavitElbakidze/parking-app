import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createUser.dto';
import {
  getErrorMessage,
  getSuccessMessage,
} from 'src/utils/response-functions.utils';
import { SuccessResponse } from 'src/utils/success-response.interface';
import { ErrorResponse } from 'src/utils/error-response.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async createUser(
    @Body(new ValidationPipe()) userDto: CreateUserDto,
  ): Promise<SuccessResponse | ErrorResponse> {
    try {
      const user = await this.userService.createUser(userDto);
      return getSuccessMessage(user, 'User created succesfully');
    } catch (err) {
      return getErrorMessage('Something went wrong!');
    }
  }
}
