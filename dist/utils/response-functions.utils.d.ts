import { ErrorResponse } from './error-response.interface';
import { SuccessResponse } from './success-response.interface';
export declare function getSuccessMessage(data: any, message?: string): SuccessResponse;
export declare function getErrorMessage(message: any): ErrorResponse;
