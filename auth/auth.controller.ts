import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/login.dto';
import { Role } from 'src/entities/user.entity';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from './jwt.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() data: SignInDto) {
    const foundUser = await this.usersService.findUserByEmailAndPassword(
      data.email,
      data.password,
    );
    if (!foundUser) {
      return {
        status: 'Error',
        message: 'Incorrect email or password',
      };
    }
    const jwtToken = await this.authService.login(foundUser);

    return {
      status: 'success',
      data: {
        role: foundUser.roles,
        email: foundUser.email,
        jwtToken,
      },
    };
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER)
  getProfile(@Req() req) {
    return req.user;
  }
}
