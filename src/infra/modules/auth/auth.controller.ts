import { AuthApplicationService } from '@application/services/auth-application.service';
import { Controller, Post, Body } from '@nestjs/common';
import { ApiLogin } from './swagger/auth';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthApplicationService) {}

  @Post('login')
  @ApiLogin()
  async login(@Body() loginDto: { email: string; password: string }) {
    return this.authService.login(loginDto.email, loginDto.password);
  }
}
