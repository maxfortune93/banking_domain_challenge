import { BankAccount } from '@domain/entities/bank-account.entity';
import { FinancialTransaction } from '@domain/entities/financial-transaction.entity';
import { BankAccountRepository } from '@domain/repositories/bank-account.repository';
import { BankAccountModelEntity } from '@infra/modules/bankAccount/entities/bank-account-model.entity';
import { FinancialTransactionModelEntity } from '@infra/modules/financial-transaction/entities/financial-transaction-model.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';


@Injectable()
export class BankAccountRepositoryImpl implements BankAccountRepository {
  constructor(
    @InjectModel(BankAccountModelEntity)
    private readonly repository: typeof BankAccountModelEntity,
  ) {}

  async create(bankAccount: BankAccount): Promise<BankAccount> {
    const data = this.toPersistence(bankAccount);
    const createdAccount = await this.repository.create(data);
    return new BankAccount(
        createdAccount.accountNumber,
        createdAccount.status,
        createdAccount.customerId,
        createdAccount.type,
        createdAccount.balance,
        createdAccount.uuid,
    );
  }

  async findByAccountNumber(accountNumber: string): Promise<BankAccount | null> {
    const account = await this.repository.findOne({ where: { accountNumber } });
    return account
      ? new BankAccount(account.accountNumber, account.status, account.customerId, account.type)
      : null;
  }

  async findByUuid(accountUuid: string): Promise<BankAccount | null> {
    const account = await this.repository.findOne({ where: { uuid: accountUuid } });
    return account
      ? new BankAccount(account.accountNumber, account.status, account.customerId, account.type, account.balance, account.uuid)
      : null;
  }

  async findAccountWithTransactionsByUuid(accountId: string): Promise<BankAccount | null> {
    const accountRecord = await this.repository.findOne({
        where: { uuid: accountId },
        include: [
          { model: FinancialTransactionModelEntity, as: 'outgoingTransactions' },
          { model: FinancialTransactionModelEntity, as: 'incomingTransactions' },
        ],
      });
  
      if (!accountRecord) {
        return null;
      }

      const bankAccount = new BankAccount(
        accountRecord.accountNumber,
        accountRecord.status,
        accountRecord.customerId,
        accountRecord.type,
        accountRecord.balance,
        accountRecord.uuid,
      );

      bankAccount.outgoingTransactions = accountRecord.outgoingTransactions.map((transaction) => {
        return new FinancialTransaction({
          uuid: transaction.uuid,
          sourceAccountId: transaction.sourceAccountId,
          targetAccountId: transaction.targetAccountId,
          amount: transaction.amount,
          type: transaction.type,
        });
      });
  
      bankAccount.incomingTransactions = accountRecord.incomingTransactions.map((transaction) => {
        return new FinancialTransaction({
          uuid: transaction.uuid,
          sourceAccountId: transaction.sourceAccountId,
          targetAccountId: transaction.targetAccountId,
          amount: transaction.amount,
          type: transaction.type,
        });
      });
  
      return bankAccount;
  
  }

  async update(bankAccount: BankAccount): Promise<void> {
    await this.repository.update(bankAccount, { where: { accountNumber: bankAccount.accountNumber } });
  }

  private toPersistence(bankAccount: BankAccount): Partial<BankAccountModelEntity> {
    return {
      accountNumber: bankAccount.accountNumber,
      balance: bankAccount.balance,
      status: bankAccount.status,
      customerId: bankAccount.customerId,
      type: bankAccount.type
    };
  }
}
