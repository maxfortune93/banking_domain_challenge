import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Customer } from 'src/domain/entities/customer.entity';
import { CustomerRepository } from 'src/domain/repositories/customer.repository';
import { CreateCustomerRequestDto } from 'src/infra/modules/customer/dto/request/create-customer-dto';
import { PersonName } from 'src/domain/value-objects/PersonName';
import { Email } from 'src/domain/value-objects/Email';
import { BirthdayDate } from 'src/domain/value-objects/BirthdayDate';
import { Password } from 'src/domain/value-objects/Password';
import { SocialSecurityNumber } from 'src/domain/value-objects/SocialSecurityNumber';
import * as bcrypt from 'bcrypt';


@Injectable()
export class CreateCustomerUseCase {
  constructor(
    @Inject('CustomerRepository')
    private readonly customerRepository: CustomerRepository,
  ) {}

  async execute(dto: CreateCustomerRequestDto): Promise<any> {

    const existingCustomer = await this.customerRepository.findByEmail(new Email(dto.email));
    if (existingCustomer) {
        throw new BadRequestException('Email is already in use.');
    }

    const existingDocument = await this.customerRepository.findByDocument(new SocialSecurityNumber(dto.document));
    if (existingDocument) {
      throw new BadRequestException('Document is already in use.');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const customer = new Customer(
      new PersonName(dto.fullName),
      new Email(dto.email),
      new SocialSecurityNumber(dto.document),
      new BirthdayDate(new Date(dto.birthday)),
      new Password(hashedPassword),
    );

    const result = await this.customerRepository.save(customer);

    return {
        uuid: result.uuid,
        message: 'Customer created successfully. Please login to create an account or perform operations.',
    };
  }
}
