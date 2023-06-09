import { RequestHandler } from 'express';
import { UserService } from './user.services';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';

/**
 * Request handler for creating a user.
 * It receives the user data from the request body, calls the UserService to create the user,
 * and sends the response with the result.
 * If an error occurs, it forwards the error to the next error handling middleware.
 */
const createUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserService.createUser(req.body); // Call the UserService to create the user

  // Dynamic response sender generic function to ensure response format

  return sendResponse<IUser>(res, {
    statusCode: 200,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

/**
 * UserController object that exports the createUser request handler.
 */
export const UserController = {
  createUser,
};
