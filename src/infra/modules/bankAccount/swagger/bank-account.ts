import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiCreatedResponse, ApiBody, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { CreateBankAccountRequestDto } from '../dto/request/create-bank-account-request.dto';
import { UpdateBankAccountStatusRequestDto } from '../dto/request/update-bank-account-request.dto';
import { BankAccountType } from '../enum/bank-account-type.enum';
import { BankAccountStatus } from '../enum/bank-account-status.enum';

export const ApiCreateAccount = () => {
    return applyDecorators(
      ApiOperation({ summary: 'Create a new bank account' }),
      ApiCreatedResponse({
        description: 'The bank account has been created successfully.',
        schema: {
          example: {
            data: {
              accountId: '123e4567-e89b-12d3-a456-426614174000',
            },
            message: 'Bank account created successfully.',
          },
        },
      }),
      ApiBody({
        type: CreateBankAccountRequestDto,
        description: 'Data required to create a new bank account',
        examples: {
          valid: {
            summary: 'Valid Input',
            value: {
              type: 'savings',
              document: '12345678909',
            },
          },
          invalid: {
            summary: 'Invalid Input',
            value: {
              type: 'invalid_type',
              document: 'invalid_document',
            },
          },
        },
      }),
    );
  };

  export const ApiUpdateAccountStatus = () => {
    return applyDecorators(
      ApiOperation({ summary: 'Update the status of a bank account' }),
      ApiParam({
        name: 'accountUuid',
        required: true,
        description: 'The UUID of the bank account to update',
        example: '123e4567-e89b-12d3-a456-426614174000',
      }),
      ApiOkResponse({
        description: 'The bank account status has been updated successfully.',
        schema: {
          example: {
            message: 'Bank account status updated successfully.',
          },
        },
      }),
      ApiBody({
        type: UpdateBankAccountStatusRequestDto,
        description: 'Data required to update the bank account status',
        examples: {
          valid: {
            summary: 'Valid Input',
            value: {
              status: `${BankAccountStatus.ACTIVE || BankAccountStatus.INACTIVE }`,
            },
          },
          invalid: {
            summary: 'Invalid Input',
            value: {
              status: 'unknown_status',
            },
          },
        },
      }),
    );
  };

  export const ApiGetAccountById = () => {
    return applyDecorators(
      ApiOperation({ summary: 'Get bank account details by ID' }),
      ApiParam({ name: 'accountUuid', required: true, description: 'UUID of the account' }),
      ApiOkResponse({
        description: 'Details of the bank account fetched successfully.',
        schema: {
          example: {
            data: {
              accountId: '123e4567-e89b-12d3-a456-426614174000',
              type: BankAccountType,
              document: '12345678910',
              status: 'ACTIVE',
            },
            message: 'Account details fetched successfully.',
          },
        },
      }),
    );
  };
  