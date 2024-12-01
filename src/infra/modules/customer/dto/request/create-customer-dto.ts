import { IsEmail, IsNotEmpty, MinLength, Matches, Validate, IsString, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';


@ValidatorConstraint({ name: 'MatchPassword', async: false })
export class MatchPasswordConstraint implements ValidatorConstraintInterface {
  validate(confirmPassword: string, args: ValidationArguments): boolean {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    return confirmPassword === relatedValue;
  }

  defaultMessage(args: ValidationArguments): string {
    return 'Passwords do not match.';
  }
}

@ValidatorConstraint({ name: 'IsCPF', async: false })
export class IsCPFConstraint implements ValidatorConstraintInterface {
  validate(document: string, args: ValidationArguments): boolean {
    if (!document) return false;

    document = document.replace(/[^\d]+/g, '');

    if (document.length !== 11 || /^(\d)\1{10}$/.test(document)) {
      return false;
    }

    const digits = document.split('').map(Number);

    const validateDigit = (baseLength: number): number => {
      const factor = baseLength + 1;
      const sum = digits
        .slice(0, baseLength)
        .reduce((acc, digit, index) => acc + digit * (factor - index), 0);

      const remainder = (sum * 10) % 11;
      return remainder === 10 ? 0 : remainder;
    };

    const firstDigitValid = validateDigit(9) === digits[9];
    const secondDigitValid = validateDigit(10) === digits[10];

    return firstDigitValid && secondDigitValid;
  }

  defaultMessage(args: ValidationArguments): string {
    return 'Invalid CPF.';
  }
}

export class CreateCustomerRequestDto {
  @IsNotEmpty({ message: 'Full name is required.' })
  @IsString({ message: 'Full name must be a string.' })
  fullName: string;

  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Invalid email address.' })
  email: string;

  @IsNotEmpty({ message: 'CPF is required.' })
  @Validate(IsCPFConstraint, { message: 'Invalid CPF.' })
  document: string;

  @IsNotEmpty({ message: 'Birthday is required.' })
  birthday: string;

  @IsNotEmpty({ message: 'Password is required.' })
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9])/, {
    message: 'Password must contain at least one letter and one number.',
  })
  password: string;

  @IsNotEmpty({ message: 'Password confirmation is required.' })
  @Validate(MatchPasswordConstraint, ['password'], {
    message: 'Passwords do not match.',
  })
  confirmPassword: string;
}
