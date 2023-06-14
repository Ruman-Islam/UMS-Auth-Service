import { RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AcademicFacultyType } from './academicFaculty.interface';
import httpStatus from 'http-status';
import { AcademicFacultyService } from './academicFaculty.services';
import pick from '../../../shared/pick';
import { academicFacultyFilterableFields } from './academicFaculty.constant';
import { paginationFields } from '../../../constants/pagination';

const createFaculty: RequestHandler = catchAsync(async (req, res) => {
  const { ...academicFacultyData } = req.body;

  const result = await AcademicFacultyService.createFaculty(
    academicFacultyData
  );

  // Dynamic response sender generic function to ensure response format
  return sendResponse<AcademicFacultyType>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Academic faculty created successfully',
    meta: null,
    data: result,
  });
});

const getAllFaculties: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, academicFacultyFilterableFields);

  // To manage pagination fields
  const paginationOptions = pick(req.query, paginationFields);

  // Calling the service
  const result = await AcademicFacultyService.getAllFaculties(
    filters,
    paginationOptions
  );

  // Dynamic response sender generic function to ensure response format
  return sendResponse<AcademicFacultyType[]>(res, {
    statusCode: httpStatus.FOUND,
    success: true,
    message: 'Faculties retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleFaculty: RequestHandler = catchAsync(async (req, res) => {
  // Extract the faculty ID from the request parameters
  const id = req.params.id;

  // Call the AcademicFacultyService to get the single faculty
  const result = await AcademicFacultyService.getSingleFaculty(id);

  // Dynamic response sender generic function to ensure response format
  return sendResponse<AcademicFacultyType>(res, {
    statusCode: httpStatus.FOUND,
    success: true,
    message: 'Faculty retrieved successfully',
    meta: null,
    data: result,
  });
});

const updateFaculty: RequestHandler = catchAsync(async (req, res) => {
  // Retrieving data from request
  const id = req.params.id; // Get the faculty ID from the request parameters
  const updatedData = req.body; // Get the updated faculty data from the request body

  // Calling the service
  const result = await AcademicFacultyService.updateFaculty(id, updatedData); // Call the service to update the faculty using the provided ID and data

  // Dynamic response sender generic function to ensure response format
  return sendResponse<AcademicFacultyType>(res, {
    statusCode: httpStatus.OK, // Set the status code to indicate a successful update
    success: true, // Set the success flag to indicate a successful operation
    message: 'Faculty updated successfully', // Provide a descriptive message about the update
    meta: null, // No additional metadata needed for this response
    data: result, // Provide the updated faculty data in the response
  });
});

const deleteFaculty: RequestHandler = catchAsync(async (req, res) => {
  // Retrieving data from request
  const id = req.params.id; // Get the faculty ID from the request parameters

  // Calling the service
  const result = await AcademicFacultyService.deleteFaculty(id); // Call the service to delete the faculty using the provided ID and data

  // Dynamic response sender generic function to ensure response format
  return sendResponse<AcademicFacultyType>(res, {
    statusCode: httpStatus.OK, // Set the status code to indicate a successful update
    success: true, // Set the success flag to indicate a successful operation
    message: 'Faculty delete successfully', // Provide a descriptive message about the update
    meta: null, // No additional metadata needed for this response
    data: result, // Provide the delete faculty data in the response
  });
});

export const AcademicFacultyController = {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
