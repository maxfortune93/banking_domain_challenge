import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerUseCase } from '../use-cases/customer/create-customer.use-case';
import { GetCustomerAccountsUseCase } from '@application/use-cases/customer/get-customer-accounts.use-case';
import { CreateCustomerRequestDto } from '@infra/modules/customer/dto/request/create-customer-dto';

@Injectable()
export class CustomerApplicationService {
  constructor(
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly getCustomerAccountUseCase: GetCustomerAccountsUseCase
  ) {}

  async createCustomer(dto: CreateCustomerRequestDto) {
    try {
      return await this.createCustomerUseCase.execute(dto);
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to create customer.');
    }
  }

  async getCustomerWithAccounts(customerUuid: string) {
    try {
      return await this.getCustomerAccountUseCase.execute(customerUuid);
    } catch (error) {
      throw new NotFoundException(error.message || 'Customer not found.');
    }
  }
}
