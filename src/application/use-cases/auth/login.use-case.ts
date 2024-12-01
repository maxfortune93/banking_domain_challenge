import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CustomerRepository } from '../../../domain/repositories/customer.repository';
import { Email } from '@domain/value-objects/Email';
import { Password } from '@domain/value-objects/Password';

@Injectable()
export class LoginUseCase {
  constructor(@Inject('CustomerRepository') private readonly customerRepository: CustomerRepository,) {}

  async execute(email: Email, password: Password): Promise<{ uuid: string; email: Email }> {
    const customer = await this.customerRepository.findByEmail(email);

    if (!customer) {
      throw new UnauthorizedException('Email Invalid or not exist');
    }

    const isPasswordValid = await bcrypt.compare(password.getValue(), customer.getPassword().getValue());

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      uuid: customer.uuid,
      email: customer.email,
    };
  }
}
