import { RequestHandler } from 'express';
import { AcademicSemesterService } from './academicSemester.services';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemesterType } from './academicSemester.interface';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';

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
  // To manage pagination fields
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicSemesterService.getAllSemesters(
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

export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
};
