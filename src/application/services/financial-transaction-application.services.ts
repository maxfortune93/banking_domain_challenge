import { FinancialTransaction } from "@domain/entities/financial-transaction.entity";
import { BankAccountRepository } from "@domain/repositories/bank-account.repository";
import { FinancialTransactionRepository } from "@domain/repositories/financial-transaction.repository";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class FinancialTransactionApplicationService {
  constructor(
    @Inject('FinancialTransactionRepository')
    private readonly financialTransactionRepository: FinancialTransactionRepository,
    @Inject('BankAccountRepository')
    private readonly bankAccountRepository: BankAccountRepository,
  ) {}

  async logTransaction(transaction: FinancialTransaction): Promise<void> {
    await this.financialTransactionRepository.save(transaction);
  }

  async deposit(depositDto: any): Promise<FinancialTransaction> {
    const { accountId, amount } = depositDto;
    const account = await this.bankAccountRepository.findByUuid(accountId);

    if (!account) {
      throw new NotFoundException('Account not found.');
    }

    const transaction = account.deposit(amount);
    await this.bankAccountRepository.update(account);
    await this.financialTransactionRepository.save(transaction);

    return transaction;
  }

  async withdraw(withdrawDto: any): Promise<FinancialTransaction> {
    const { accountId, amount } = withdrawDto;
    const account = await this.bankAccountRepository.findByUuid(accountId);

    if (!account) {
      throw new NotFoundException('Account not found.');
    }

    const transaction = account.withdraw(amount);
    await this.bankAccountRepository.update(account);
    await this.financialTransactionRepository.save(transaction);

    return transaction;
  }

  async transfer(transferDto: any): Promise<FinancialTransaction> {
    const { sourceAccountId, targetAccountId, amount } = transferDto;

    const sourceAccount = await this.bankAccountRepository.findByUuid(sourceAccountId);
    const targetAccount = await this.bankAccountRepository.findByUuid(targetAccountId);

    if (!sourceAccount || !targetAccount) {
      throw new NotFoundException('One or both accounts not found.');
    }

    const transaction = sourceAccount.transfer(targetAccount, amount);
    await this.bankAccountRepository.update(sourceAccount);
    await this.bankAccountRepository.update(targetAccount);
    await this.financialTransactionRepository.save(transaction);

    return transaction;
  }
}
