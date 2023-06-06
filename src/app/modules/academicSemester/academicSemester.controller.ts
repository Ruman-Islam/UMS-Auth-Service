import { RequestHandler } from 'express';
import { academicSemesterService } from './academicSemester.services';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicSemester } from './academicSemester.interface';

/**
createSemester is a request handler function that creates a new academic semester.
It extracts the academic semester data from the request body.
It calls the academicSemesterService.createSemester function to create the semester using the extracted data.
If the creation is successful, it sends a response with a success status and the created semester data.
If an error occurs, it forwards the error to the next error handling middleware.
@param req The Express Request object.
@param res The Express Response object.
@param next The next middleware function.
@returns A Promise that resolves to the response.
*/
const createSemester: RequestHandler = catchAsync(async (req, res, next) => {
  const { ...academicSemesterData } = req.body;
  const result = await academicSemesterService.createSemester(
    academicSemesterData
  );

  sendResponse<IAcademicSemester>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic semester created successfully',
    data: result,
  });
  next();
});
export const academicSemesterController = {
  createSemester,
};
