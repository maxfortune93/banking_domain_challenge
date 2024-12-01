import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FinancialTransactionController } from './financial-transaction.controller';
import { FinancialTransactionRepositoryImpl } from '@infra/modules/financial-transaction/repositories/financial-transaction.repository.impl';
import { FinancialTransactionModelEntity } from '@infra/modules/financial-transaction/entities/financial-transaction-model.entity';
import { FinancialTransactionApplicationService } from '@application/services/financial-transaction-application.services';
import { BankAccountModelEntity } from '@infra/modules/bankAccount/entities/bank-account-model.entity';
import { BankAccountRepositoryImpl } from '@infra/modules/bankAccount/repositories/bank-account.repository.impl';

@Module({
  imports: [SequelizeModule.forFeature([FinancialTransactionModelEntity,
    BankAccountModelEntity,])],
  controllers: [FinancialTransactionController],
  providers: [
    FinancialTransactionApplicationService,
    {
      provide: 'FinancialTransactionRepository',
      useClass: FinancialTransactionRepositoryImpl,
    },
    {
        provide: 'BankAccountRepository',
        useClass: BankAccountRepositoryImpl,
    },
  ],
  exports: [FinancialTransactionApplicationService],
})
export class FinancialTransactionModule {}
