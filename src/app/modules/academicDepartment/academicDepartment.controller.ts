import { RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AcademicDepartmentType } from './academicDepartment.interface';
import httpStatus from 'http-status';
import { AcademicDepartmentService } from './academicDepartment.services';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { academicDepartmentFilterableFields } from './academicDepartment.constant';

const createDepartment: RequestHandler = catchAsync(async (req, res) => {
  const { ...academicDepartmentData } = req.body;

  const result = await AcademicDepartmentService.createDepartment(
    academicDepartmentData
  );

  // Dynamic response sender generic function to ensure response format
  return sendResponse<AcademicDepartmentType>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Academic Department created successfully',
    meta: null,
    data: result,
  });
});

const getAllDepartment: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, academicDepartmentFilterableFields);

  // To manage pagination fields
  const paginationOptions = pick(req.query, paginationFields);

  // Calling the service
  const result = await AcademicDepartmentService.getAllDepartment(
    filters,
    paginationOptions
  );

  // Dynamic response sender generic function to ensure response format
  return sendResponse<AcademicDepartmentType[]>(res, {
    statusCode: httpStatus.FOUND,
    success: true,
    message: 'Departments retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleDepartment: RequestHandler = catchAsync(async (req, res) => {
  // Extract the Department ID from the request parameters
  const id = req.params.id;

  // Call the AcademicDepartmentService to get the single Department
  const result = await AcademicDepartmentService.getSingleDepartment(id);

  // Dynamic response sender generic function to ensure response format
  return sendResponse<AcademicDepartmentType>(res, {
    statusCode: httpStatus.FOUND,
    success: true,
    message: 'Department retrieved successfully',
    meta: null,
    data: result,
  });
});

const updateDepartment: RequestHandler = catchAsync(async (req, res) => {
  // Retrieving data from request
  const id = req.params.id; // Get the Department ID from the request parameters
  const updatedData = req.body; // Get the updated Department data from the request body

  // Calling the service
  const result = await AcademicDepartmentService.updateDepartment(
    id,
    updatedData
  ); // Call the service to update the Department using the provided ID and data

  // Dynamic response sender generic function to ensure response format
  return sendResponse<AcademicDepartmentType>(res, {
    statusCode: httpStatus.OK, // Set the status code to indicate a successful update
    success: true, // Set the success flag to indicate a successful operation
    message: 'Department updated successfully', // Provide a descriptive message about the update
    meta: null, // No additional metadata needed for this response
    data: result, // Provide the updated Department data in the response
  });
});

const deleteDepartment: RequestHandler = catchAsync(async (req, res) => {
  // Retrieving data from request
  const id = req.params.id; // Get the Department ID from the request parameters

  // Calling the service
  const result = await AcademicDepartmentService.deleteDepartment(id); // Call the service to delete the Department using the provided ID and data

  // Dynamic response sender generic function to ensure response format
  return sendResponse<AcademicDepartmentType>(res, {
    statusCode: httpStatus.OK, // Set the status code to indicate a successful update
    success: true, // Set the success flag to indicate a successful operation
    message: 'Department delete successfully', // Provide a descriptive message about the update
    meta: null, // No additional metadata needed for this response
    data: result, // Provide the delete Department data in the response
  });
});

export const AcademicDepartmentController = {
  createDepartment,
  getAllDepartment,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
