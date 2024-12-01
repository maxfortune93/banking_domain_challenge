import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiCreatedResponse, ApiBody, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { CreateCustomerRequestDto } from '../dto/request/create-customer-dto';


export const ApiCreateCustomer = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new customer' }),
    ApiCreatedResponse({
      description: 'Customer has been created successfully.',
      schema: {
        example: {
          data: { uuid: '123e4567-e89b-12d3-a456-426614174000' },
          message: 'Customer created successfully.',
        },
      },
    }),
    ApiBody({
      type: CreateCustomerRequestDto,
      description: 'Customer creation payload',
      examples: {
        valid: {
          summary: 'Valid Input',
          value: {
            fullName: 'John Doe',
            email: 'john.doe@example.com',
            document: '12345678909',
            birthday: '1990-01-01',
            password: 'Password123',
            confirmPassword: 'Password123',
          },
        },
        invalid: {
          summary: 'Invalid Input',
          value: {
            fullName: '',
            email: 'invalid-email',
            document: 'invalid-cpf',
            birthday: 'not-a-date',
            password: 'short',
            confirmPassword: 'mismatch',
          },
        },
      },
    }),
  );
};


export const ApiGetCustomerById = () => {
    return applyDecorators(
      ApiOperation({ summary: 'Get customer details by UUID' }),
      ApiParam({
        name: 'customerUuid',
        required: true,
        description: 'UUID of the customer to retrieve',
        example: '123e4567-e89b-12d3-a456-426614174000',
      }),
      ApiOkResponse({
        description: 'Customer details fetched successfully.',
        schema: {
          example: {
            data: {
              uuid: '123e4567-e89b-12d3-a456-426614174000',
              fullName: 'John Doe',
              email: 'john.doe@example.com',
              document: '12345678909',
              birthday: '1990-01-01',
              accounts: [
                {
                  accountUuid: '456e7890-e12b-34d5-a678-901234567890',
                  type: 'savings',
                  balance: 5000,
                  status: 'active',
                },
              ],
            },
            message: 'Customer fetched successfully.',
          },
        },
      }),
    );
  };