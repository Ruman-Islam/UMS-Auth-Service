import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { adminFilterableField } from './admin.constant';
import { AdminType } from './admin.interface';
import { AdminService } from './admin.services';

const getAllAdmins: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, adminFilterableField);

  // To manage pagination fields
  const paginationOptions = pick(req.query, paginationFields);

  // Calling the service
  const result = await AdminService.getAllAdmins(filters, paginationOptions);

  // Dynamic response sender generic function to ensure response format
  return sendResponse<AdminType[]>(res, {
    statusCode: httpStatus.FOUND,
    success: true,
    message: 'Admin retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleAdmin: RequestHandler = catchAsync(async (req, res) => {
  // Extract the Admin ID from the request parameters
  const id = req.params.id;

  // Call the AdminService to get the single Admin
  const result = await AdminService.getSingleAdmin(id);

  // Dynamic response sender generic function to ensure response format
  return sendResponse<AdminType>(res, {
    statusCode: httpStatus.FOUND,
    success: true,
    message: 'Admin retrieved successfully',
    meta: null,
    data: result,
  });
});

const updateAdmin: RequestHandler = catchAsync(async (req, res) => {
  // Retrieving data from request
  const id = req.params.id; // Get the semester ID from the request parameters
  const updatedData = req.body; // Get the updated semester data from the request body

  // Calling the service
  const result = await AdminService.updateAdmin(id, updatedData); // Call the service to update the semester using the provided ID and data

  // Dynamic response sender generic function to ensure response format
  return sendResponse<AdminType>(res, {
    statusCode: httpStatus.OK, // Set the status code to indicate a successful update
    success: true, // Set the success flag to indicate a successful operation
    message: 'Semester updated successfully', // Provide a descriptive message about the update
    meta: null, // No additional metadata needed for this response
    data: result, // Provide the updated semester data in the response
  });
});

const deleteSingleAdmin: RequestHandler = catchAsync(async (req, res) => {
  // Retrieving data from request
  const id = req.params.id; // Get the Admin ID from the request parameters

  // Calling the service
  const result = await AdminService.deleteSingleAdmin(id); // Call the service to delete the Admin using the provided ID and data

  // Dynamic response sender generic function to ensure response format
  return sendResponse<AdminType>(res, {
    statusCode: httpStatus.OK, // Set the status code to indicate a successful update
    success: true, // Set the success flag to indicate a successful operation
    message: 'Admin delete successfully', // Provide a descriptive message about the update
    meta: null, // No additional metadata needed for this response
    data: result, // Provide the delete Admin data in the response
  });
});

export const AdminController = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteSingleAdmin,
};
