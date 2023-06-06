/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { IGenericErrorMessage } from '../../interface/error';
import handleValidationError from '../../errors/handleValidationError';
import { errorLogger } from '../../shared/logger';
import { ZodError } from 'zod';
import handleZodError from '../../errors/handleZodError';

const globalErrorHandler: ErrorRequestHandler = (
  error, // All the error comes through "error"
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /**
   While "development" mode here it will print the error. And while "production" mode it will store the error log and also it'll print the error because in the "errorLogger" function instructions are given to print on console. 
   */
  config.env === 'development'
    ? console.log(`❌ globalErrorHandler ~`, error)
    : errorLogger.error(`❌❌ globalErrorHandler ~`, error);
  // ..................

  /**
   A generic error response must holds status code, error message and error messages. 
   This portions will be changed based on the error type dynamically
   */
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorMessages: IGenericErrorMessage[] = [];
  // ..................

  // When mongoose schema validation error caught
  if (error?.name === 'ValidationError') {
    /**
     "handleValidation" helps to reshape the mongoose's error into generic error response. Because mongoose error's are different. It returns status code, message and error messages.
     */
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages;
    // ..................
  } else if (error instanceof ZodError) {
    /**
     "handleZodError" helps to reshape the Zod's error into generic error response. Because Zod error's are different. It returns status code, message and error messages.
     */
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages;
    // ..................
  } else if (error instanceof ApiError) {
    /**
     When error occurred from any api: service. Services will send error through custom-maid "ApiError". And here reshape the error to show as generic response
     */
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
    // ..................
  } else if (error instanceof Error) {
    /**
     When error throws from built-in Error constructor it will catch the error and here reshape the error to show as generic response
     */
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
    // ..................
  }

  // Generic Error Response
  next();
  return res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config?.env !== 'production' ? error?.stack : undefined,
  });
};

export default globalErrorHandler;
