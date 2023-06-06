import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interface/error';
import { IGenericErrorResponse } from '../interface/common';

/**
 * Reshapes the validation error from Mongoose into a generic error response.
 * @param error The Mongoose validation error.
 * @returns The generic error response with status code, message, and error messages.
 */
const handleValidationError = (
  error: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  // Extract the error messages from the validation error
  const errors: IGenericErrorMessage[] = Object.values(error.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    }
  );

  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handleValidationError;
