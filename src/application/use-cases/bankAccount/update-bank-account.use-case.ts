import { BankAccountRepository } from '@domain/repositories/bank-account.repository';
import { BankAccountStatus } from '@infra/modules/bankAccount/enum/bank-account-status.enum';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UpdateBankAccountStatusUseCase {
  constructor
  (@Inject('BankAccountRepository') 
  private readonly bankAccountRepository: BankAccountRepository
) {}

  async execute(accountUuid: string, newStatus: BankAccountStatus): Promise<{ message: string, data?: any }> {
    const bankAccount = await this.bankAccountRepository.findByUuid(accountUuid);

    if (!bankAccount) {
      throw new Error('Bank account not found.');
    }

    if (newStatus === 'active') {
      bankAccount.activateAccount();
    } else {
      bankAccount.deactivateAccount();
    }

    await this.bankAccountRepository.update(bankAccount);

    return {
        message: `The account ${bankAccount.accountNumber} has been ${newStatus === 'active' ? 'activated' : 'deactivated'}`
    };
  }
}
