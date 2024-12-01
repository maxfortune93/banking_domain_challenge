import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Inject, Param, Post, Req, UseGuards } from "@nestjs/common";
import { CreateCustomerRequestDto } from "./dto/request/create-customer-dto";
import { CustomerApplicationService } from "@application/services/customer-application.service";
import { JwtAuthGuard } from "@infra/modules/auth/guards/jwt-auth.guard";
import { ResponseHandler } from "src/shared/response-handler/response-handler";


@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerApplicationService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateCustomerRequestDto) {
    const result = await this.customerService.createCustomer(dto);
    console.log({result});
    return ResponseHandler.success({uuid: result.uuid}, result.message, HttpStatus.CREATED);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':customerUuid')
  async getCustomerById(@Param('customerUuid') customerUuid: string) {
    const customer = await this.customerService.getCustomerWithAccounts(customerUuid);
    return ResponseHandler.success(customer, 'Customer fetched successfully.');
  }

}
