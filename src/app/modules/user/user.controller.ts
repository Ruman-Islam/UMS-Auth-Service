import { RequestHandler } from 'express';
import { UserService } from './user.services';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserType } from './user.interface';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { userSearchableFields } from './user.constant';

/**
 * createUser is a request handler function that handles the creation of a new user.
 * It calls the UserService.createUser function to create the user using the data from the request body.
 * If the creation is successful, it sends a response with a success status, a message indicating the user was created successfully, and the created user data.
 * @param req The Express Request object.
 * @param res The Express Response object.
 * @returns A Promise that resolves to the response.
 */
const createUser: RequestHandler = catchAsync(async (req, res) => {
  // Call the UserService to create the user
  const result = await UserService.createUser(req.body);

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
  // To manage filter fields
  const filters = pick(req.query, userSearchableFields);

  // To manage pagination fields
  const paginationOptions = pick(req.query, paginationFields);

  // Calling the service
  const result = await UserService.getAllUsers(filters, paginationOptions);

  // Dynamic response sender generic function to ensure response format
  return sendResponse<UserType[]>(res, {
    statusCode: httpStatus.FOUND,
    success: true,
    message: 'Users retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

/**
 * getAllUsers is a request handler function that handles the retrieval of a single user.
 * It calls the UserService.getSingleUser function to fetch the user using the object id.
 * If the retrieval is successful, it sends a response with a success status, a message, pagination metadata, and the retrieved user.
 * @param req The Express Request object.
 * @param res The Express Response object.
 * @returns A Promise that resolves to the response.
 */
const getSingleUser: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;

  // Calling the service
  const result = await UserService.getSingleUser(id);

  // Dynamic response sender generic function to ensure response format
  return sendResponse<UserType>(res, {
    statusCode: httpStatus.FOUND,
    success: true,
    message: 'User retrieved successfully',
    meta: null,
    data: result,
  });
});

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
};
