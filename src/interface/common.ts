import { IGenericErrorMessage } from './error';

/**
 * Represents a generic error response type.
 */
export type IGenericErrorResponse = {
  statusCode: number; // The HTTP status code associated with the error response.
  message: string; // The error message describing the nature of the error.
  errorMessages: IGenericErrorMessage[]; // An array of error messages providing additional details about the errors encountered.
};
