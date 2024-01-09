import { ErrorResponse } from './error-response.interface';
import { ResponseType } from './response-type.enum';
import { SuccessResponse } from './success-response.interface';

export function getSuccessMessage(data, message?: string): SuccessResponse {
  return {
    status: ResponseType.success,
    data,
    message,
  };
}

export function getErrorMessage(message): ErrorResponse {
  return {
    status: ResponseType.error,
    error: message,
  };
}
