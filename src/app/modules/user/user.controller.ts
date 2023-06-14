import { RequestHandler } from 'express';
import { UserService } from './user.services';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserType } from './user.interface';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { userSearchableFields } from './user.constant';

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { student, ...userData } = req.body;
  // Call the UserService to create the user
  const result = await UserService.createStudent(student, userData);

  // Dynamic response sender generic function to ensure response format
  return sendResponse<UserType>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Student created successfully',
    meta: null,
    data: result,
  });
});

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
  createStudent,
  getAllUsers,
  getSingleUser,
};
