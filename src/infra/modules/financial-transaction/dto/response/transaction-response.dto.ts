import { IsNumber, IsEnum, IsUUID } from "class-validator";

import { TransactionType } from "../../enum/transaction-type.enum";

export class TransactionResponseDto {
    @IsUUID()
    uuid: string;
  
    @IsUUID()
    sourceAccountId: string;
  
    @IsUUID()
    targetAccountId?: string;
  
    @IsNumber()
    amount: number;
  
    @IsEnum(TransactionType)
    type: TransactionType;
  }