import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { facultyFilterableField } from './faculty.constant';
import { FacultyType } from './faculty.interface';
import { FacultyService } from './faculty.services';

const getAllFaculties: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, facultyFilterableField);

  // To manage pagination fields
  const paginationOptions = pick(req.query, paginationFields);

  // Calling the service
  const result = await FacultyService.getAllFaculties(
    filters,
    paginationOptions
  );

  // Dynamic response sender generic function to ensure response format
  return sendResponse<FacultyType[]>(res, {
    statusCode: httpStatus.FOUND,
    success: true,
    message: 'Faculty retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleFaculty: RequestHandler = catchAsync(async (req, res) => {
  // Extract the Faculty ID from the request parameters
  const id = req.params.id;

  // Call the FacultyService to get the single Faculty
  const result = await FacultyService.getSingleFaculty(id);

  // Dynamic response sender generic function to ensure response format
  return sendResponse<FacultyType>(res, {
    statusCode: httpStatus.FOUND,
    success: true,
    message: 'Faculty retrieved successfully',
    meta: null,
    data: result,
  });
});

const updateFaculty: RequestHandler = catchAsync(async (req, res) => {
  // Retrieving data from request
  const id = req.params.id; // Get the semester ID from the request parameters
  const updatedData = req.body; // Get the updated semester data from the request body

  // Calling the service
  const result = await FacultyService.updateFaculty(id, updatedData); // Call the service to update the semester using the provided ID and data

  // Dynamic response sender generic function to ensure response format
  return sendResponse<FacultyType>(res, {
    statusCode: httpStatus.OK, // Set the status code to indicate a successful update
    success: true, // Set the success flag to indicate a successful operation
    message: 'Semester updated successfully', // Provide a descriptive message about the update
    meta: null, // No additional metadata needed for this response
    data: result, // Provide the updated semester data in the response
  });
});

const deleteSingleFaculty: RequestHandler = catchAsync(async (req, res) => {
  // Retrieving data from request
  const id = req.params.id; // Get the Faculty ID from the request parameters

  // Calling the service
  const result = await FacultyService.deleteSingleFaculty(id); // Call the service to delete the Faculty using the provided ID and data

  // Dynamic response sender generic function to ensure response format
  return sendResponse<FacultyType>(res, {
    statusCode: httpStatus.OK, // Set the status code to indicate a successful update
    success: true, // Set the success flag to indicate a successful operation
    message: 'Faculty delete successfully', // Provide a descriptive message about the update
    meta: null, // No additional metadata needed for this response
    data: result, // Provide the delete Faculty data in the response
  });
});

export const FacultyController = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteSingleFaculty,
};
