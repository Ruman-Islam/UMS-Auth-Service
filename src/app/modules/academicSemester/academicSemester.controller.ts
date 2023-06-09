import { RequestHandler } from 'express';
import { academicSemesterService } from './academicSemester.services';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicSemester } from './academicSemester.interface';

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
  const result = await academicSemesterService.createSemester(
    academicSemesterData
  );

  // Dynamic response sender generic function to ensure response format
  return sendResponse<IAcademicSemester>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic semester created successfully',
    data: result,
  });
});
export const academicSemesterController = {
  createSemester,
};
