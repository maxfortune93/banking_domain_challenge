import { BirthdayDate } from "../value-objects/BirthdayDate";
import { Email } from "../value-objects/Email";
import { Password } from "../value-objects/Password";
import { PersonName } from "../value-objects/PersonName";
import { SocialSecurityNumber } from "../value-objects/SocialSecurityNumber";
import { BankAccount } from "./bank-account.entity";

export class Customer {
    private readonly accounts: BankAccount[] = [];
    constructor(
        public readonly fullName: PersonName,
        public readonly email: Email,
        public readonly document: SocialSecurityNumber,
        public readonly birthday: BirthdayDate,
        private readonly password: Password,
        public readonly uuid?: string,
    ){}

    authenticate(password: string): boolean {
        return this.password.comparePassword(password);
    }

    getPassword(): Password {
        return this.password;
    }

    getAccounts(): BankAccount[] {
        return this.accounts;
      }
}