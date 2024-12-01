import { IsNotEmpty, IsNumber, IsPositive, IsUUID } from 'class-validator';

export class DepositRequestDto {
  @IsNotEmpty()
  @IsUUID()
  accountId: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive({ message: 'Amount must be a positive number.' })
  amount: number;
}

export class WithdrawRequestDto extends DepositRequestDto {}

export class TransferRequestDto {
  @IsNotEmpty()
  @IsUUID()
  sourceAccountId: string;

  @IsNotEmpty()
  @IsUUID()
  targetAccountId: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive({ message: 'Amount must be a positive number.' })
  amount: number;
}
