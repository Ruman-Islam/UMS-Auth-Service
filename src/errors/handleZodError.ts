import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorResponse } from '../interface/common';
import { IGenericErrorMessage } from '../interface/error';

/**
 * Reshaping the validation error from Zod into a generic error response.
 * @param error The Zod error.
 * @returns The generic error response with status code, message, and error messages.
 {
  statusCode = statusCode;
  message = message;
  errorMessages = message
    ? [
        {
          path: '',
          message: error?.message,
        },
      ]
    : []
  };
 */
const handleZodError = (error: ZodError): IGenericErrorResponse => {
  // Extract the error messages from the Zod error
  const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  const statusCode = 400;
  return {
    statusCode,
    message: 'Zod Error',
    errorMessages: errors,
  };
};

export default handleZodError;
