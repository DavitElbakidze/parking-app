import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { RolesGuard } from './roles.guard';
import { JwtAuthGuard } from './jwt.guard';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: 'jwtSecret.secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, RolesGuard, JwtAuthGuard],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
