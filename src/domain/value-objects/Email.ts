import { BadRequestException } from '@nestjs/common';
import { validateEmail } from 'src/shared/utils/validate.utils';

export class Email {
  public readonly value: string;

  constructor(email: string) {
    if (!email || !validateEmail(email)) {
      throw new BadRequestException(`E-mail: ${email} é inválido`);
    }
    this.value = email;
  }
  getValue(): string {
    return this.value;
  }
}