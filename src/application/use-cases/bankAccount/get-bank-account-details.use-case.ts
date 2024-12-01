import { BankAccountRepository } from '@domain/repositories/bank-account.repository';
import { BankAccountResponseDto } from '@infra/modules/bankAccount/dto/response/bank-account-with-transaction.response';
import { Inject, Injectable } from '@nestjs/common';


@Injectable()
export class GetBankAccountDetailsUseCase {
  constructor(
    @Inject('BankAccountRepository') 
  private readonly bankAccountRepository: BankAccountRepository
) {}

  async execute(accountId: string): Promise<BankAccountResponseDto> {
    const account = await this.bankAccountRepository.findAccountWithTransactionsByUuid(accountId);

    if (!account) {
      throw new Error('Account not found');
    }

    return this.toResponseDto(account);
  }

  private toResponseDto(account: any): BankAccountResponseDto {
    return {
      uuid: account.uuid,
      accountNumber: account.accountNumber,
      balance: account.balance,
      status: account.status,
      type: account.type,
      outgoingTransactions: account.outgoingTransactions.map((transaction: any) => ({
        uuid: transaction.uuid,
        sourceAccountId: transaction.sourceAccountId,
        targetAccountId: transaction.targetAccountId,
        amount: transaction.amount,
        type: transaction.type,
      })),
      incomingTransactions: account.incomingTransactions.map((transaction: any) => ({
        uuid: transaction.uuid,
        sourceAccountId: transaction.sourceAccountId,
        targetAccountId: transaction.targetAccountId,
        amount: transaction.amount,
        type: transaction.type,
      })),
    };
  }
}
