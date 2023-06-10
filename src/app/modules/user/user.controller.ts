import { RequestHandler } from 'express';
import { UserService } from './user.services';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserType } from './user.interface';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';

/**
 * createUser is a request handler function that handles the creation of a new user.
 * It calls the UserService.createUser function to create the user using the data from the request body.
 * If the creation is successful, it sends a response with a success status, a message indicating the user was created successfully, and the created user data.
 * @param req The Express Request object.
 * @param res The Express Response object.
 * @returns A Promise that resolves to the response.
 */
const createUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserService.createUser(req.body); // Call the UserService to create the user

  // Dynamic response sender generic function to ensure response format
  return sendResponse<UserType>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully',
    meta: null,
    data: result,
  });
});

/**
 * getAllUsers is a request handler function that handles the retrieval of all users.
 * It extracts pagination options from the request query.
 * It calls the UserService.getAllUsers function to fetch the users using the pagination options.
 * If the retrieval is successful, it sends a response with a success status, a message, pagination metadata, and the retrieved users.
 * @param req The Express Request object.
 * @param res The Express Response object.
 * @returns A Promise that resolves to the response.
 */
const getAllUsers: RequestHandler = catchAsync(async (req, res) => {
  // To manage pagination fields
  const paginationOptions = pick(req.query, paginationFields);

  const result = await UserService.getAllUsers(paginationOptions);

  return sendResponse<UserType[]>(res, {
    statusCode: httpStatus.FOUND,
    success: true,
    message: 'Users retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

/**
 * UserController object that exports the createUser request handler.
 */
export const UserController = {
  createUser,
  getAllUsers,
};
