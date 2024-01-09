import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { PasswordReset } from 'src/entities/password-reset.entity';
import { PasswordResetController } from '../password-reset/password-reset.controller';
import { PasswordResetService } from '../password-reset/password-reset.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, PasswordReset])],
  providers: [UsersService, PasswordResetService],
  controllers: [UsersController, PasswordResetController],
  exports: [UsersService],
})
export class UsersModule {}
