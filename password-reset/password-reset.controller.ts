import { Body, Controller, Post } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';

@Controller('password-reset')
export class PasswordResetController {
  constructor(private readonly passwordResetService: PasswordResetService) {}

  @Post('request')
  async requestPasswordReset(@Body() data: { email: string }): Promise<void> {
    const { email } = data;
    await this.passwordResetService.requsetToReset(email);
  }

  @Post('reset')
  async resetPassword(
    @Body() data: { token: string; newPassword: string },
  ): Promise<void> {
    const { token, newPassword } = data;
    await this.passwordResetService.resetPassword(token, newPassword);
  }
}
