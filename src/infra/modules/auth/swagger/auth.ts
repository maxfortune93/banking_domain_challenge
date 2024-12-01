import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiOkResponse } from '@nestjs/swagger';

export const ApiLogin = () => {
  return applyDecorators(
    ApiOperation({ summary: 'User login' }),
    ApiBody({
      description: 'User login payload',
      schema: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            format: 'email',
            example: 'john.doe@example.com',
            description: 'User email address',
          },
          password: {
            type: 'string',
            example: 'Password123',
            description: 'User password',
          },
        },
        required: ['email', 'password'],
      },
    }),
    ApiOkResponse({
      description: 'Login successful. Returns an access token.',
      schema: {
        example: {
          data: {
            accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          },
          message: 'Login successful.',
        },
      },
    }),
  );
};
