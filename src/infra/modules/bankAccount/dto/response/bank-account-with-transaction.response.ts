import { TransactionResponseDto } from "@infra/modules/financial-transaction/dto/response/transaction-response.dto";
import { IsArray, IsEnum, IsNumber, IsString, IsUUID } from "class-validator";
import { BankAccountType } from "../../enum/bank-account-type.enum";
import { BankAccountStatus } from "../../enum/bank-account-status.enum";

export class BankAccountResponseDto {
    @IsUUID()
    uuid: string;
  
    @IsString()
    accountNumber: string;
  
    @IsNumber()
    balance: number;
  
    @IsEnum(BankAccountType)
    status: BankAccountStatus;
  
    @IsEnum(BankAccountType)
    type: BankAccountType;
  
    @IsArray()
    outgoingTransactions: TransactionResponseDto[];
  
    @IsArray()
    incomingTransactions: TransactionResponseDto[];
  }