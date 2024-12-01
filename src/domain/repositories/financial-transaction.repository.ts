import { FinancialTransaction } from "@domain/entities/financial-transaction.entity";

export interface FinancialTransactionRepository {
    save(transaction: FinancialTransaction): Promise<void>;
    findByAccountId(accountId: string): Promise<FinancialTransaction[]>;
  }
  