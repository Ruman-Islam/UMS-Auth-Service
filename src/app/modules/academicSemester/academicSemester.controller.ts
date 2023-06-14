import { RequestHandler } from 'express';
import { AcademicSemesterService } from './academicSemester.services';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemesterType } from './academicSemester.interface';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { academicSemesterFilterableFields } from './academicSemester.constant';

const createSemester: RequestHandler = catchAsync(async (req, res) => {
  const { ...academicSemesterData } = req.body;
  const result = await AcademicSemesterService.createSemester(
    academicSemesterData
  );

  // Dynamic response sender generic function to ensure response format
  return sendResponse<AcademicSemesterType>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Academic semester created successfully',
    meta: null,
    data: result,
  });
});

const getAllSemesters: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, academicSemesterFilterableFields);

  // To manage pagination fields
  const paginationOptions = pick(req.query, paginationFields);

  // Calling the service
  const result = await AcademicSemesterService.getAllSemesters(
    filters,
    paginationOptions
  );

  // Dynamic response sender generic function to ensure response format
  return sendResponse<AcademicSemesterType[]>(res, {
    statusCode: httpStatus.FOUND,
    success: true,
    message: 'Semesters retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleSemester: RequestHandler = catchAsync(async (req, res) => {
  // Extract the semester ID from the request parameters
  const id = req.params.id;

  // Call the AcademicSemesterService to get the single semester
  const result = await AcademicSemesterService.getSingleSemester(id);

  // Dynamic response sender generic function to ensure response format
  return sendResponse<AcademicSemesterType>(res, {
    statusCode: httpStatus.FOUND,
    success: true,
    message: 'Semester retrieved successfully',
    meta: null,
    data: result,
  });
});

const updateSemester: RequestHandler = catchAsync(async (req, res) => {
  // Retrieving data from request
  const id = req.params.id; // Get the semester ID from the request parameters
  const updatedData = req.body; // Get the updated semester data from the request body

  // Calling the service
  const result = await AcademicSemesterService.updateSemester(id, updatedData); // Call the service to update the semester using the provided ID and data

  // Dynamic response sender generic function to ensure response format
  return sendResponse<AcademicSemesterType>(res, {
    statusCode: httpStatus.OK, // Set the status code to indicate a successful update
    success: true, // Set the success flag to indicate a successful operation
    message: 'Semester updated successfully', // Provide a descriptive message about the update
    meta: null, // No additional metadata needed for this response
    data: result, // Provide the updated semester data in the response
  });
});

const deleteSemester: RequestHandler = catchAsync(async (req, res) => {
  // Retrieving data from request
  const id = req.params.id; // Get the semester ID from the request parameters

  // Calling the service
  const result = await AcademicSemesterService.deleteSemester(id); // Call the service to delete the semester using the provided ID and data

  // Dynamic response sender generic function to ensure response format
  return sendResponse<AcademicSemesterType>(res, {
    statusCode: httpStatus.OK, // Set the status code to indicate a successful update
    success: true, // Set the success flag to indicate a successful operation
    message: 'Semester delete successfully', // Provide a descriptive message about the update
    meta: null, // No additional metadata needed for this response
    data: result, // Provide the delete semester data in the response
  });
});

export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
