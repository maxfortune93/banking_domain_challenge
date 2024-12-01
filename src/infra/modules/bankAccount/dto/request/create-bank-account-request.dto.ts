import { IsNotEmpty, IsEnum, IsString, Matches, Validate } from 'class-validator';
import { BankAccountType } from '../../enum/bank-account-type.enum';
import { IsCPFConstraint } from '@infra/modules/customer/dto/request/create-customer-dto';


export class CreateBankAccountRequestDto {
  @IsNotEmpty()
  @IsEnum(BankAccountType, { message: 'Account type must be "savings" or "checking".' })
  type: BankAccountType;

  @IsNotEmpty({ message: 'CPF is required.' })
  @Validate(IsCPFConstraint, { message: 'Invalid CPF.' })
  document: string;
}
