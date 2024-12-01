import { IsNotEmpty, IsEnum} from 'class-validator';
import { BankAccountStatus } from '../../enum/bank-account-status.enum';


export class UpdateBankAccountStatusRequestDto {
  @IsNotEmpty()
  @IsEnum(BankAccountStatus, { message: 'Account type must be "active" or "inactive".' })
  status: BankAccountStatus;
}
