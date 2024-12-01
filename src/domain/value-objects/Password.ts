export class Password {
    private readonly value: string;
  
    constructor(password: string) {
      this.value = password;
    }
  
    comparePassword(password: string): boolean {
      return this.value === password;
    }
  
    getValue(): string {
      return this.value;
    }
  }
  