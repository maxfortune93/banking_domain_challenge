import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUseCase } from '../use-cases/auth/login.use-case';
import { Email } from '@domain/value-objects/Email';
import { Password } from '@domain/value-objects/Password';

@Injectable()
export class AuthApplicationService {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<{ accessToken: string }> {

    const emailValue = new Email(email);
    const passwordValue = new Password(password);

    const { uuid, email: userEmail } = await this.loginUseCase.execute(emailValue, passwordValue);

    const payload = { sub: uuid, email: userEmail };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
