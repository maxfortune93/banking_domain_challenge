import { Customer } from '../entities/customer.entity';
import { Email } from '../value-objects/Email';
import { SocialSecurityNumber } from '../value-objects/SocialSecurityNumber';

export interface CustomerRepository {
  save(customer: Customer): Promise< any>;
  findByEmail(email: Email): Promise<Customer | null>;
  findByDocument(document: SocialSecurityNumber): Promise<Customer | null>;
  findById(uuid: string): Promise<Customer | null>;
  findCustomerWithAccounts(customerUuid: string): Promise<Customer | null>;
}
