import { HttpStatus } from "@nestjs/common";

export class ResponseHandler {
    static success(data?: any, message: string = 'Operation successful', statusCode: number = HttpStatus.OK) {
      return {
        statusCode,
        success: true,
        message,
        data,
      };
    }
  
    static error(message: string, statusCode: number = HttpStatus.BAD_REQUEST, details?: any) {
      return {
        statusCode,
        success: false,
        message,
        ...(details && { details }),
      };
    }
  }
  