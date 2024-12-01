import { AuthApplicationService } from '@application/services/auth-application.service';
import { Controller, Post, Body } from '@nestjs/common';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthApplicationService) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    return this.authService.login(loginDto.email, loginDto.password);
  }
}
