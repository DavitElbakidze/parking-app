import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordReset } from 'src/entities/password-reset.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { randomBytes } from 'crypto';
import * as nodemailer from 'nodemailer';
import { hash } from 'bcrypt';

@Injectable()
export class PasswordResetService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UsersService,
    @InjectRepository(PasswordReset)
    private readonly passwordResetRepository: Repository<PasswordReset>,
  ) {}

  private generateUniqueToken(): string {
    const tokenLength = 32;
    return randomBytes(tokenLength).toString('hex');
  }

  async sendPasswordResetEmail(email: string, token: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'ddaviid1995@gmail.com',
        pass: 'xqtf ufrg rmgb xdpa',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: 'ddaviid1995@gmail.com',
      to: email,
      subject: 'Password Reset Request',
      text: `Thttp://localhost:3000/password-reset/request${token}`,
    };

    await transporter.sendMail(mailOptions);
  }

  async requsetToReset(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const token = this.generateUniqueToken();

    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 1);

    const passwordReset = new PasswordReset();
    passwordReset.token = token;
    passwordReset.expirationDate = expirationDate;
    passwordReset.user = user;

    await this.passwordResetRepository.save(passwordReset);

    await this.sendPasswordResetEmail(user.email, token);
  }

  async resetPassword(token, newPassword) {
    const passwordReset = await this.passwordResetRepository
      .createQueryBuilder('passwordReset')
      .leftJoinAndSelect('passwordReset.user', 'user')
      .where('passwordReset.token = :token', { token })
      .getOne();

    if (passwordReset.expirationDate <= new Date()) {
      throw new NotFoundException('Password reset token has expired');
    }

    const user = passwordReset.user;
    if (!user) {
      throw new NotFoundException('User not found'); // Check if the user is loaded
    }

    const hashedPassword = await hash(newPassword, 10);
    user.password = hashedPassword;

    await this.userRepository.save(user);

    await this.passwordResetRepository.remove(passwordReset);
  }
}
