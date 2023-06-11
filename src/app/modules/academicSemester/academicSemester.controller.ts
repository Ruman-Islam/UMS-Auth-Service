import { RequestHandler } from 'express';
import { AcademicSemesterService } from './academicSemester.services';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemesterType } from './academicSemester.interface';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { academicSemesterSearchableFields } from './academicSemester.constant';

/**
createSemester is a request handler function that handles to creates a new academic semester using service.
It extracts the academic semester data from the request body.
It calls the academicSemesterService.createSemester function to create the semester using the extracted data.
If the creation is successful, it sends a response with a success status and the created semester data.
If an error occurs, it forwards the error to the next error handling middleware.
@param req The Express Request object.
@param res The Express Response object.
@param next The next middleware function.
@returns A Promise that resolves to the response.
*/
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

/**
 * getAllSemesters is a request handler function that handles the retrieval of all academic semesters.
 * It extracts pagination options from the request query.
 * It calls the AcademicSemesterService.getAllSemesters function to fetch the semesters using the pagination options.
 * If the retrieval is successful, it sends a response with a success status, a message, pagination metadata, and the retrieved semesters.
 * @param req The Express Request object.
 * @param res The Express Response object.
 * @returns A Promise that resolves to the response.
 */
const getAllSemesters: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, [
    'searchTerm',
    ...academicSemesterSearchableFields,
  ]);

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

/**
 * getSingleSemester is a request handler function that retrieves a single academic semester based on the provided ID.
 * It accepts the Express Request and Response objects as parameters.
 * @param req The Express Request object.
 * @param res The Express Response object.
 * @returns A Promise that resolves to the response.
 */
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

/**
 * updateSemester is a request handler function that updates a single academic semester based on the provided ID and data.
 * It accepts the Express Request and Response objects as parameters.
 * @param req The Express Request object.
 * @param res The Express Response object.
 * @returns A Promise that resolves to the response.
 */
const updateSemester: RequestHandler = catchAsync(async (req, res) => {
  // Retrieving data from request
  const id = req.params.id; // Get the semester ID from the request parameters
  const updatedData = req.body; // Get the updated semester data from the request body

  // Calling the service
  const result = await AcademicSemesterService.updateSingleSemester(
    id,
    updatedData
  ); // Call the service to update the semester using the provided ID and data

  // Dynamic response sender generic function to ensure response format
  return sendResponse<AcademicSemesterType>(res, {
    statusCode: httpStatus.FOUND, // Set the status code to indicate a successful update
    success: true, // Set the success flag to indicate a successful operation
    message: 'Semester updated successfully', // Provide a descriptive message about the update
    meta: null, // No additional metadata needed for this response
    data: result, // Provide the updated semester data in the response
  });
});

export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
};
