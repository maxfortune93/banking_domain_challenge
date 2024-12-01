export class BirthdayDate {
    private readonly value: Date;
  
    constructor(birthday: Date) {
      this.validateBirthday(birthday);
      this.value = birthday;
    }
  
    private validateBirthday(birthday: Date): void {
      if (!(birthday instanceof Date) || isNaN(birthday.getTime())) {
        throw new Error('Invalid birthday.');
      }
      const today = new Date();
      if (birthday >= today) {
        throw new Error('Birthday must be in the past.');
      }
    }
  
    getValue(): Date {
      return this.value;
    }
  }
  