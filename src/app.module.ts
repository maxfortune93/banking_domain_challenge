import { Module, OnModuleInit } from '@nestjs/common';
import { sequelizeConfig } from './infra/database/sequelize.config';
import { CustomerModule } from './infra/modules/customer/customer.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './shared/http-exception/http-exception.filter';
import { AuthModule } from '@infra/modules/auth/auth.module';
import { BankAccountModule } from '@infra/modules/bankAccount/bank-account.module';
import { FinancialTransactionModule } from '@infra/modules/financial-transaction/financial-transaction.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      ...sequelizeConfig
    }),
    CustomerModule,
    BankAccountModule,
    AuthModule,
    FinancialTransactionModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly sequelize: Sequelize) {}
  async onModuleInit() {
    try {
      await this.sequelize.authenticate();
      console.log('Database connection established successfully.');
    } catch (error) {
      console.error('Error during database connection:', error);
    }
  }
}