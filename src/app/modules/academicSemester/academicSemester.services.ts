import ApiError from '../../../errors/ApiError';
import { academicSemesterTitleCodeMapper } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

/**
createSemester is a service function that creates a new academic semester.
It receives a payload of type IAcademicSemester, which contains the necessary data for creating the semester.
The function first checks if the code provided in the payload matches the code mapped to the title in the academicSemesterTitleCodeMapper object.
If they don't match, it throws an ApiError with a status code of 400 and an error message indicating an invalid semester code.
If the code is valid, the function uses the AcademicSemester model to create the semester in the database and returns the result.
@param payload The payload containing the data for creating the academic semester.
@returns A Promise that resolves to the created academic semester.
*/
const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(400, 'Invalid semester code!');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

export const academicSemesterService = {
  createSemester,
};
