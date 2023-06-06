import { RequestHandler } from 'express';
import { UserService } from './user.services';

/**
 * Request handler for creating a user.
 * It receives the user data from the request body, calls the UserService to create the user,
 * and sends the response with the result.
 * If an error occurs, it forwards the error to the next error handling middleware.
 */
const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body; // Extract the user data from the request body
    const result = await UserService.createUser(user); // Call the UserService to create the user
    return res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    }); // Send the response with the successful result
  } catch (error) {
    next(error); // Forward the error to the next error handling middleware
  }
};

/**
 * UserController object that exports the createUser request handler.
 */
export const UserController = {
  createUser,
};
