export class SocialSecurityNumber {
    private readonly value: string;
  
    constructor(document: string) {
      this.validateDocument(document);
      this.value = document;
    }
  
    private validateDocument(document: string): void {
      const regex = /^\d{11}$/;
      if (!regex.test(document)) {
        throw new Error('Invalid document. It must contain exactly 11 numeric characters.');
      }
    }
  
    getValue(): string {
      return this.value;
    }
  }
  