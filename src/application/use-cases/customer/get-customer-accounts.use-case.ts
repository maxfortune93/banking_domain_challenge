import { CustomerRepository } from '@domain/repositories/customer.repository';
import { CustomerResponseDto } from '@infra/modules/customer/dto/response/customer-response.dto';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetCustomerAccountsUseCase {
  constructor(
    @Inject('CustomerRepository')
    private readonly customerRepository: CustomerRepository,
) {}

  async execute(customerUuid: string): Promise<CustomerResponseDto> {
    const customer = await this.customerRepository.findCustomerWithAccounts(customerUuid);

    if (!customer) {
      throw new Error('Customer not found');
    }

    return this.toResponseDto(customer);
  }

  private toResponseDto(customer: any): CustomerResponseDto {
    return {
      uuid: customer.uuid,
      fullName: customer.fullName,
      email: customer.email,
      document: customer.document,
      birthday: customer.birthday,
      accounts: customer.accounts.map((account: any) => ({
        uuid: account.uuid,
        accountNumber: account.accountNumber,
        balance: account.balance,
        status: account.status,
        type: account.type,
      })),
    };
  }
}
