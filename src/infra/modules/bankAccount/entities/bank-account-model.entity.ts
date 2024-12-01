import { Table, Column, Model, PrimaryKey, ForeignKey, DataType, Default, HasMany, BelongsTo } from 'sequelize-typescript';
import { CustomerModelEntity } from '../../customer/entities/customer-model.entity';
import { FinancialTransactionModelEntity } from '../../financial-transaction/entities/financial-transaction-model.entity';

@Table({ tableName: 'bank_accounts' })
export class BankAccountModelEntity extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID, allowNull: false })
  uuid: string;
  
  @Column({ allowNull: false, unique: true })
  accountNumber: string;

  @Column({ defaultValue: 0, type: DataType.FLOAT })
  balance: number;

  @Column({ defaultValue: 'active' })
  status: 'active' | 'inactive';

  @ForeignKey(() => CustomerModelEntity)
  @Column({ type: DataType.UUID })
  customerId: string;

  @BelongsTo(() => CustomerModelEntity, 'customerId')
  customer: CustomerModelEntity;

  @Column
  type: 'savings' | 'checking';

  @HasMany(() => FinancialTransactionModelEntity, 'sourceAccountId')
  outgoingTransactions: FinancialTransactionModelEntity[];

  @HasMany(() => FinancialTransactionModelEntity, 'targetAccountId')
  incomingTransactions: FinancialTransactionModelEntity[];
}
