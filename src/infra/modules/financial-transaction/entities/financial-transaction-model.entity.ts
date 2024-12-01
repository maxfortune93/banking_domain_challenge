import {
    Table,
    Column,
    Model,
    PrimaryKey,
    Default,
    DataType,
    ForeignKey,
    BelongsTo,
  } from 'sequelize-typescript';
  import { BankAccountModelEntity } from '../../bankAccount/entities/bank-account-model.entity';
  
  @Table({ tableName: 'financial_transactions', timestamps: true })
  export class FinancialTransactionModelEntity extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID, allowNull: false })
    uuid: string;
  
    @Column({
      type: DataType.ENUM('deposit', 'withdrawal', 'transfer'),
      allowNull: false,
    })
    type: 'deposit' | 'withdrawal' | 'transfer';
  
    @ForeignKey(() => BankAccountModelEntity)
    @Column({ type: DataType.UUID, allowNull: false })
    sourceAccountId: string;
  
    @BelongsTo(() => BankAccountModelEntity, 'sourceAccountId')
    sourceAccount: BankAccountModelEntity;
  
    @ForeignKey(() => BankAccountModelEntity)
    @Column({ type: DataType.UUID, allowNull: true })
    targetAccountId?: string; // Only applicable for transfers
  
    @BelongsTo(() => BankAccountModelEntity, 'targetAccountId')
    targetAccount?: BankAccountModelEntity;
  
    @Column({
      type: DataType.FLOAT,
      allowNull: false,
      validate: {
        min: 0.01,
      },
    })
    amount: number;
  
    @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
    timestamp: Date;
  
    @Column({
      type: DataType.ENUM('success', 'failed'),
      allowNull: false,
      defaultValue: 'success',
    })
    status: 'success' | 'failed';
  }
  