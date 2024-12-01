import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BankAccountController } from './bank-account.controller';
import { BankAccountModelEntity } from '@infra/modules/bankAccount/entities/bank-account-model.entity';
import { CreateBankAccountUseCase } from '@application/use-cases/bankAccount/create-bank-account.use-case';
import { BankAccountRepositoryImpl } from '@infra/modules/bankAccount/repositories/bank-account.repository.impl';
import { UpdateBankAccountStatusUseCase } from '@application/use-cases/bankAccount/update-bank-account.use-case';
import { BankAccountApplicationService } from '@application/services/bank-account-application.service';
import { CustomerModule } from '../customer/customer.module';
import { FinancialTransactionModelEntity } from '@infra/modules/financial-transaction/entities/financial-transaction-model.entity';
import { GetBankAccountDetailsUseCase } from '@application/use-cases/bankAccount/get-bank-account-details.use-case';


@Module({
  imports: [
    SequelizeModule.forFeature([BankAccountModelEntity, FinancialTransactionModelEntity]),
    CustomerModule
],
  controllers: [BankAccountController],
  providers: [
    BankAccountApplicationService,
    CreateBankAccountUseCase,
    UpdateBankAccountStatusUseCase,
    GetBankAccountDetailsUseCase,
    { provide: 'BankAccountRepository', useClass: BankAccountRepositoryImpl },
  ],
  exports:[
    CreateBankAccountUseCase,
    UpdateBankAccountStatusUseCase,
  ]
})
export class BankAccountModule {}
