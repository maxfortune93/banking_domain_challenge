import { FinancialTransaction } from "./financial-transaction.entity";

export class BankAccount {

  public outgoingTransactions: FinancialTransaction[] = [];
  public incomingTransactions: FinancialTransaction[] = [];

    constructor(
      public readonly accountNumber: string,
      public status: 'active' | 'inactive' = 'active',
      public readonly customerId: string,
      public readonly type: 'savings' | 'checking',
      public balance: number = 0,
      public readonly uuid?: string,
    ) {}
  
    activateAccount(): void {
      this.status = 'active';
    }
  
    deactivateAccount(): void {
      this.status = 'inactive';
    }
  
    validateTransaction(): void {
      if (this.status !== 'active') {
        throw new Error('The account must be active to perform transactions.');
      }
    }

    deposit(amount: number): FinancialTransaction {
      this.validateTransaction();
      this.balance += amount;
  
      return new FinancialTransaction({
        type: 'deposit',
        sourceAccountId: this.uuid,
        amount,
      });
    }

    withdraw(amount: number): FinancialTransaction {
      this.validateTransaction();
  
      if (this.balance - amount < 0) {
        throw new Error('Insufficient funds.');
      }
  
      this.balance -= amount;
  
      const transaction = new FinancialTransaction({
        type: 'withdrawal',
        sourceAccountId: this.uuid,
        amount: amount,
      });
  
      return transaction;
    }
  
    transfer(targetAccount: BankAccount, amount: number): FinancialTransaction {
      if (this.status !== 'active' || targetAccount.status !== 'active') {
        throw new Error('Both accounts must be active to perform a transfer.');
      }
  
      if (this.balance - amount < 0) {
        throw new Error('Insufficient funds for the transfer.');
      }
  
      this.balance -= amount;
      targetAccount.balance += amount;
  
      const transaction = new FinancialTransaction({
        type: 'transfer',
        sourceAccountId: this.uuid,
        targetAccountId: targetAccount.uuid,
        amount: amount,
      });
  
      return transaction;
    }
  }
  