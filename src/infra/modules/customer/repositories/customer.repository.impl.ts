import { Customer } from "@domain/entities/customer.entity";
import { CustomerRepository } from "@domain/repositories/customer.repository";
import { BirthdayDate } from "@domain/value-objects/BirthdayDate";
import { Email } from "@domain/value-objects/Email";
import { Password } from "@domain/value-objects/Password";
import { PersonName } from "@domain/value-objects/PersonName";
import { SocialSecurityNumber } from "@domain/value-objects/SocialSecurityNumber";
import { BankAccountModelEntity } from "@infra/modules/bankAccount/entities/bank-account-model.entity";
import { CustomerModelEntity } from "@infra/modules/customer/entities/customer-model.entity";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { validate as isUUID } from 'uuid';


@Injectable()
export class CustomerRepositoryImpl implements CustomerRepository {
  constructor(
     @InjectModel(CustomerModelEntity)
     private readonly repository: typeof CustomerModelEntity,
  ) {}

  async save(customer: Customer) {
    const customerEntity = this.toPersistence(customer);
    return await this.repository.create(customerEntity);
  }

  async findByEmail(email: Email): Promise<Customer | null> {
    const customerEntity = await this.repository.findOne({
        where: { email: email.getValue() },
      });
    if (!customerEntity) {
      return null;
    }
    return this.toDomain(customerEntity);
  }

  async findByDocument(document: SocialSecurityNumber): Promise<Customer | null> {
    const customerEntity = await this.repository.findOne({
      where: { document: document.getValue() },
    });
  
    if (!customerEntity) {
      return null;
    }
  
    return this.toDomain(customerEntity);
  }
  
  async findById(uuid: string): Promise<Customer | null> {
    const customerEntity = await this.repository.findByPk(uuid);

    if (!customerEntity) {
      return null;
    }

    return this.toDomain(customerEntity);
  }

  async findCustomerWithAccounts(customerUuid: string): Promise<any> {
    if (!isUUID(customerUuid)) {
      throw new Error('Invalid UUID format');
    }
    return this.repository.findOne({
      where: { uuid: customerUuid },
      include: [{ model: BankAccountModelEntity, as: 'accounts' }],
    });
  }

  private toPersistence(customer: Customer): Partial<CustomerModelEntity> {
    return {
        uuid: customer.uuid,
        fullName: customer.fullName.getFullName(),
        email: customer.email.getValue(),
        document: customer.document.getValue(),
        birthday: customer.birthday.getValue(),
        password: customer.getPassword().getValue(),
    };
  }
  

  private toDomain(entity: CustomerModelEntity): Customer {
    return new Customer(
        new PersonName(entity.fullName),
        new Email(entity.email),
        new SocialSecurityNumber(entity.document),
        new BirthdayDate(entity.birthday),
        new Password(entity.password),
        entity.uuid,
    );
  }
}
