import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { DepositRequestDto, TransferRequestDto, WithdrawRequestDto } from '../dto/request/financial.dto';

export const ApiDeposit = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Deposit money into an account' }),
    ApiBody({
      type: DepositRequestDto,
      description: 'Payload to deposit money',
      examples: {
        valid: {
          summary: 'Valid Input',
          value: {
            accountId: '123e4567-e89b-12d3-a456-426614174000',
            amount: 500.0,
          },
        },
        invalid: {
          summary: 'Invalid Input',
          value: {
            accountId: 'not-a-uuid',
            amount: -100.0,
          },
        },
      },
    }),
    ApiCreatedResponse({
      description: 'Deposit transaction completed successfully.',
      schema: {
        example: {
          data: {
            transactionId: '789e1234-e56b-78c9-a012-345678901234',
            accountId: '123e4567-e89b-12d3-a456-426614174000',
            amount: 500.0,
            type: 'deposit',
            createdAt: '2024-12-01T12:00:00.000Z',
          },
          message: 'Deposit successful.',
        },
      },
    }),
  );
};

export const ApiWithdraw = () => {
    return applyDecorators(
      ApiOperation({ summary: 'Withdraw money from an account' }),
      ApiBody({
        type: WithdrawRequestDto,
        description: 'Payload to withdraw money',
        examples: {
          valid: {
            summary: 'Valid Input',
            value: {
              accountId: '123e4567-e89b-12d3-a456-426614174000',
              amount: 200.0,
            },
          },
          invalid: {
            summary: 'Invalid Input',
            value: {
              accountId: 'not-a-uuid',
              amount: -50.0,
            },
          },
        },
      }),
      ApiCreatedResponse({
        description: 'Withdrawal transaction completed successfully.',
        schema: {
          example: {
            data: {
              transactionId: '123e7890-a12b-34c5-d678-901234567890',
              accountId: '123e4567-e89b-12d3-a456-426614174000',
              amount: 200.0,
              type: 'withdraw',
              createdAt: '2024-12-01T12:30:00.000Z',
            },
            message: 'Withdrawal successful.',
          },
        },
      }),
    );
  };

  export const ApiTransfer = () => {
    return applyDecorators(
      ApiOperation({ summary: 'Transfer money between accounts' }),
      ApiBody({
        type: TransferRequestDto,
        description: 'Payload to transfer money',
        examples: {
          valid: {
            summary: 'Valid Input',
            value: {
              sourceAccountId: '123e4567-e89b-12d3-a456-426614174000',
              targetAccountId: '456e7890-e12b-34d5-a678-901234567890',
              amount: 150.0,
            },
          },
          invalid: {
            summary: 'Invalid Input',
            value: {
              sourceAccountId: 'invalid-uuid',
              targetAccountId: 'another-invalid-uuid',
              amount: -75.0,
            },
          },
        },
      }),
      ApiCreatedResponse({
        description: 'Transfer transaction completed successfully.',
        schema: {
          example: {
            data: {
              transactionId: '901e2345-b67c-89d0-a123-456789012345',
              sourceAccountId: '123e4567-e89b-12d3-a456-426614174000',
              targetAccountId: '456e7890-e12b-34d5-a678-901234567890',
              amount: 150.0,
              type: 'transfer',
              createdAt: '2024-12-01T13:00:00.000Z',
            },
            message: 'Transfer successful.',
          },
        },
      }),
    );
  };