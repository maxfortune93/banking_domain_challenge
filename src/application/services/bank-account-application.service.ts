import { CreateBankAccountUseCase } from '@application/use-cases/bankAccount/create-bank-account.use-case';
import { GetBankAccountDetailsUseCase } from '@application/use-cases/bankAccount/get-bank-account-details.use-case';
import { UpdateBankAccountStatusUseCase } from '@application/use-cases/bankAccount/update-bank-account.use-case';
import { BankAccountResponseDto } from '@infra/modules/bankAccount/dto/response/bank-account-with-transaction.response';
import { BankAccountStatus } from '@infra/modules/bankAccount/enum/bank-account-status.enum';
import { BankAccountType } from '@infra/modules/bankAccount/enum/bank-account-type.enum';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BankAccountApplicationService {
  constructor(
    private readonly createBankAccountUseCase: CreateBankAccountUseCase,
    private readonly updateBankAccountUseCase: UpdateBankAccountStatusUseCase,
    private readonly getBankAccountDetailsUseCase: GetBankAccountDetailsUseCase
  ) {}

  async createAccount(
    customerId: string,
    type: BankAccountType,
    document: string,
  ): Promise<{ message: string, data: any }> {
    return this.createBankAccountUseCase.execute(customerId, type, document);
  }

  async updateAccountStatus(accountUuid: string, newStatus: BankAccountStatus): Promise<{ message: string, data?: any }> {
    return this.updateBankAccountUseCase.execute(accountUuid, newStatus);
  }

  async getAccountDetails(accountId: string) : Promise<BankAccountResponseDto> {
    return this.getBankAccountDetailsUseCase.execute(accountId);
  }
}
