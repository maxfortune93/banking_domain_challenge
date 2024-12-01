import { Table, Column, Model, PrimaryKey, DataType, Default, HasMany } from 'sequelize-typescript';
import { BankAccountModelEntity } from '../../bankAccount/entities/bank-account-model.entity';

@Table({ tableName: 'customers' })
export class CustomerModelEntity extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID, allowNull: false })
  uuid: string;

  @Column({ allowNull: false })
  fullName: string;

  @Column({ allowNull: false, unique: true })
  email: string;

  @Column({ allowNull: false, unique: true })
  document: string;

  @Column({ allowNull: false })
  birthday: Date;

  @Column({ allowNull: false })
  password: string;

  @HasMany(() => BankAccountModelEntity, 'customerId')
  accounts: BankAccountModelEntity[];

}


