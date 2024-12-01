import { BankAccount } from "@domain/entities/bank-account.entity";
import { Customer } from "@domain/entities/customer.entity";
import { formatToDateOnly } from "src/shared/utils/formatter.utils";

export class CustomerResponseDto {
    uuid: string;
    fullName: string;
    email: string;
    document: string;
    birthday: string;
    accounts: AccountResponseDto[];

    constructor(customer: Customer) {
      this.uuid = customer.uuid!;
      this.fullName = customer.fullName.getFullName();
      this.email = customer.email.getValue();
      this.document = customer.document.getValue();
      this.birthday = formatToDateOnly(customer.birthday.getValue());
      this.accounts = customer.getAccounts().map(account => new AccountResponseDto(account));
    }
  }
  
  export class AccountResponseDto {
    uuid: string;
    accountNumber: string;
    balance: number;
    status: 'active' | 'inactive';
    type: 'savings' | 'checking';

    constructor(account: BankAccount) {
      this.uuid = account.uuid!;
      this.accountNumber = account.accountNumber;
      this.balance = account.balance;
      this.status = account.status;
      this.type = account.type;
    }
  }
  