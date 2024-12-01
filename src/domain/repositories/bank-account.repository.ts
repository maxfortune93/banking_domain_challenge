import { BankAccount } from "@domain/entities/bank-account.entity";

export interface BankAccountRepository {
    create(bankAccount: BankAccount): Promise<BankAccount>;
    findByAccountNumber(accountNumber: string): Promise<BankAccount | null>;
    findByUuid(uuid: string): Promise<BankAccount | null>;
    update(bankAccount: BankAccount): Promise<void>;
    findAccountWithTransactionsByUuid(uuid: string): Promise<BankAccount>
  }
  