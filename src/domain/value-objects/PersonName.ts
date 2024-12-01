export class PersonName {
  private readonly regex = /^[A-Za-zÀ-ÖØ-öø-ÿ-'\s]{2,}$/;

    constructor(
      private readonly fullName: string
    ) {
      if (!this.isValidName(this.fullName)) {
        throw new Error('Invalid name');
      }
    }

    private isValidName(name: string): boolean {
      return name && this.regex.test(name.trim());
    }
  
    getFullName(): string {
      return this.fullName.trim();
    }

    toString(): string {
      return this.getFullName();
    }
  }
  