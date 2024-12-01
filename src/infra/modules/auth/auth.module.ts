import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';

import { CustomerRepositoryImpl } from '../customer/repositories/customer.repository.impl';
import { AuthApplicationService } from '@application/services/auth-application.service';
import { JwtStrategy } from '@infra/modules/auth/strategies/jwt.strategy';
import { LoginUseCase } from '@application/use-cases/auth/login.use-case';
import { SequelizeModule } from '@nestjs/sequelize';
import { CustomerModelEntity } from '@infra/modules/customer/entities/customer-model.entity';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, 
      signOptions: { expiresIn: '1h' },
    }),
    SequelizeModule.forFeature([CustomerModelEntity])
  ],
  controllers: [AuthController],
  providers: [
    AuthApplicationService,
    JwtStrategy,
    LoginUseCase,
    {
        provide: 'CustomerRepository',
        useClass: CustomerRepositoryImpl,
    },
  ],
  exports: [LoginUseCase],
})
export class AuthModule {}
