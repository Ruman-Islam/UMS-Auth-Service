import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { academicSemesterTitleCodeMapper } from './academicSemester.constant';
import { AcademicSemesterType } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import {
  GenericResponseType,
  PaginationOptionType,
} from '../../../interface/common';
import { PaginationHelpers } from '../../../helper/paginationHelper';
import { SortOrder } from 'mongoose';

/**
createSemester is a service function that creates a new academic semester.
It receives a payload of type AcademicSemesterType, which contains the necessary data for creating the semester.
The function first checks if the code provided in the payload matches the code mapped to the title in the academicSemesterTitleCodeMapper object.
If they don't match, it throws an ApiError with a status code of 400 and an error message indicating an invalid semester code.
If the code is valid, the function uses the AcademicSemester model to create the semester in the database and returns the result.
@param payload The payload containing the data for creating the academic semester.
@returns A Promise that resolves to the created academic semester.
*/
const createSemester = async (
  payload: AcademicSemesterType
): Promise<AcademicSemesterType> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code!');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

/**
 * getAllSemesters is an asynchronous function that retrieves academic semesters based on the provided pagination options.
 * It calculates the pagination parameters such as page, limit, skip, sortBy, and sortOrder using the PaginationHelpers.calculationPagination function.
 * It initializes an empty object sortConditions to hold the sorting conditions.
 * If sortBy and sortOrder are provided, it assigns them to the sortConditions object.
 * It queries the AcademicSemester collection, sorts the results based on the sortConditions, skips the specified number of documents, and limits the number of documents to retrieve.
 * It retrieves the total count of academic semesters using the AcademicSemester.countDocuments function.
 * It returns a Promise that resolves to a GenericResponseType containing the retrieved academic semesters and the pagination metadata.
 * @param paginationOptions The pagination options used to retrieve academic semesters.
 * @returns A Promise that resolves to a GenericResponseType containing the retrieved academic semesters and the pagination metadata.
 */
const getAllSemesters = async (
  paginationOptions: PaginationOptionType
): Promise<GenericResponseType<AcademicSemesterType[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelpers.calculationPagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await AcademicSemester.find({})
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
};
