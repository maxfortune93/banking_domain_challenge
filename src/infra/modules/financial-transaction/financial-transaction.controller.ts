import { FinancialTransactionApplicationService } from "@application/services/financial-transaction-application.services";
import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { ResponseHandler } from "src/shared/response-handler/response-handler";
import { DepositRequestDto, TransferRequestDto, WithdrawRequestDto } from "./dto/request/financial.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { ApiDeposit, ApiWithdraw, ApiTransfer } from "./swagger/financial-transaction";

@Controller('transactions')
export class FinancialTransactionController {
  constructor(private readonly financialTransactionService: FinancialTransactionApplicationService) {}

  @UseGuards(JwtAuthGuard)
  @Post('deposit')
  @ApiDeposit()
  async deposit(@Body() depositDto: DepositRequestDto) {
    const transaction = await this.financialTransactionService.deposit(depositDto);
    return ResponseHandler.success(transaction, 'Deposit successful.');
  }

  @UseGuards(JwtAuthGuard)
  @Post('withdraw')
  @ApiWithdraw()
  async withdraw(@Body() withdrawDto: WithdrawRequestDto) {
    const transaction = await this.financialTransactionService.withdraw(withdrawDto);
    return ResponseHandler.success(transaction, 'Withdrawal successful.');
  }

  @UseGuards(JwtAuthGuard)
  @Post('transfer')
  @ApiTransfer()
  async transfer(@Body() transferDto: TransferRequestDto) {
    const transaction = await this.financialTransactionService.transfer(transferDto);
    return ResponseHandler.success(transaction, 'Transfer successful.');
  }
}
