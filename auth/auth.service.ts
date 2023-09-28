import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async login(user: User) {
    const payload = {
      userId: user.id,
      email: user.email,
      sub: user.id,
      role: user.roles,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
