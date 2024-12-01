import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CustomerController } from './customer.controller';
import { CustomerApplicationService } from '@application/services/customer-application.service';
import { CustomerModelEntity } from '@infra/modules/customer/entities/customer-model.entity';
import { CreateCustomerUseCase } from 'src/application/use-cases/customer/create-customer.use-case';
import { CustomerRepositoryImpl } from '@infra/modules/customer/repositories/customer.repository.impl';
import { JwtAuthGuard } from '@infra/modules/auth/guards/jwt-auth.guard';
import { GetCustomerAccountsUseCase } from '@application/use-cases/customer/get-customer-accounts.use-case';


@Module({
  imports: [SequelizeModule.forFeature([CustomerModelEntity])],
  controllers: [CustomerController],
  providers: [
    CustomerApplicationService,
    CreateCustomerUseCase,
    GetCustomerAccountsUseCase,
    { provide: 'CustomerRepository', useClass: CustomerRepositoryImpl },
    JwtAuthGuard
  ],
  exports:[
    CreateCustomerUseCase,
    GetCustomerAccountsUseCase,
    { provide: 'CustomerRepository', useClass: CustomerRepositoryImpl },
  ]
})
export class CustomerModule {}
