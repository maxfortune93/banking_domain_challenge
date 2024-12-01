interface FinancialTransactionProps {
    uuid?: string;
    type: 'deposit' | 'withdrawal' | 'transfer';
    sourceAccountId: string;
    amount: number;
    timestamp?: Date;
    status?: 'success' | 'failed';
    targetAccountId?: string;
  }
  
  export class FinancialTransaction {
    public readonly uuid?: string;
    public readonly type: 'deposit' | 'withdrawal' | 'transfer';
    public readonly sourceAccountId: string;
    public readonly targetAccountId?: string;
    public readonly amount: number;
    public readonly timestamp: Date;
    public readonly status: 'success' | 'failed';
  
    constructor(props: FinancialTransactionProps) {
      this.type = props.type;
      this.sourceAccountId = props.sourceAccountId;
      this.targetAccountId = props.targetAccountId;
      this.amount = props.amount;
      this.timestamp = props.timestamp || new Date();
      this.status = props.status || 'success';
    }
  }