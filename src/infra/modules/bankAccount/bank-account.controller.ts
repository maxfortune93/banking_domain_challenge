import { BankAccountApplicationService } from '@application/services/bank-account-application.service';
import { JwtAuthGuard } from '@infra/modules/auth/guards/jwt-auth.guard';
import { Controller, Post, Patch, Body, Param, Req, UseGuards, Get, HttpStatus } from '@nestjs/common';
import { CreateBankAccountRequestDto } from './dto/request/create-bank-account-request.dto';
import { UpdateBankAccountStatusRequestDto } from './dto/request/update-bank-account-request.dto';
import { ResponseHandler } from 'src/shared/response-handler/response-handler';
import { ApiCreateAccount, ApiGetAccountById, ApiUpdateAccountStatus } from './swagger/bank-account';

@Controller('accounts')
export class BankAccountController {
  constructor(
    private readonly bankAccountService: BankAccountApplicationService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiCreateAccount()
  async createAccount(
    @Body() createAccountDto: CreateBankAccountRequestDto,
    @Req() request: any,
  ) {
    const customerId = request.user.userId;
    const result = await this.bankAccountService.createAccount(
        customerId,
        createAccountDto.type,
        createAccountDto.document,
      );
      return ResponseHandler.success(result.data, result.message, HttpStatus.CREATED);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':accountUuid/status')
  @ApiUpdateAccountStatus()
  async updateStatus(
    @Param('accountUuid') accountUuid: string,
    @Body() updateStatusDto: UpdateBankAccountStatusRequestDto,
  ) {
    return await this.bankAccountService.updateAccountStatus(accountUuid, updateStatusDto.status);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':accountUuid')
  @ApiGetAccountById()
  async getAccountById(@Param('accountUuid') accountUuid: string) {
    const account = await this.bankAccountService.getAccountDetails(accountUuid);
    return ResponseHandler.success(account, 'Account details fetched successfully.');
  }
}
