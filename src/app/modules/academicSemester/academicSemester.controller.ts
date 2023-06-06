import { RequestHandler } from 'express';
import { academicSemesterService } from './academicSemester.services';

const createSemester: RequestHandler = async (req, res, next) => {
  try {
    const { ...academicSemesterData } = req.body; // Extract the user data from the request body
    const result = await academicSemesterService.createSemester(
      academicSemesterData
    ); // Call the UserService to create the user
    return res.status(200).json({
      success: true,
      message: 'Academic semester created successfully',
      data: result,
    }); // Send the response with the successful result
  } catch (error) {
    next(error); // Forward the error to the next error handling middleware
  }
};

export const academicSemesterController = {
  createSemester,
};
