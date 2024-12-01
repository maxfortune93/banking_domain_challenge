import { BankAccount } from '@domain/entities/bank-account.entity';
import { BankAccountRepository } from '@domain/repositories/bank-account.repository';
import { CustomerRepository } from '@domain/repositories/customer.repository';
import { BankAccountType } from '@infra/modules/bankAccount/enum/bank-account-type.enum';
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CreateBankAccountUseCase {
  constructor(
    @Inject('BankAccountRepository') 
    private readonly bankAccountRepository: BankAccountRepository,
    @Inject('CustomerRepository') // Use o token correspondente
    private readonly customerRepository: CustomerRepository,
) {}

  async execute(
    customerId: string,
    type: BankAccountType,
    document: string,
): Promise<{ message: string, data: any }> {

    const customer = await this.customerRepository.findById(customerId);
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    if (customer.document.getValue() !== document) {
        throw new BadRequestException('The provided document does not match the customer.');
    }

    const accountNumber = Math.random().toString().slice(2, 10);

    const bankAccount = new BankAccount(accountNumber, 'active', customerId, type);

    const createdAccount = await this.bankAccountRepository.create(bankAccount);

    return {
        message: 'Account created successfully',
        data: {
          uuid: createdAccount.uuid,
          accountNumber: createdAccount.accountNumber,
          type: createdAccount.type,
          status: createdAccount.status,
          balance: createdAccount.balance,
        },
      };
  }
}
