import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import {
  academicSemesterSearchableFields,
  academicSemesterTitleCodeMapper,
} from './academicSemester.constant';
import { AcademicSemesterType } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import {
  FilterType,
  GenericResponseType,
  PaginationOptionType,
} from '../../../interface/common';
import { PaginationHelpers } from '../../../helper/paginationHelper';
import { SortOrder } from 'mongoose';

/**
 * createSemester is an asynchronous function that creates a new academic semester.
 * It accepts the payload containing the details of the academic semester to be created.
 * @param payload The payload containing the details of the academic semester.
 * @returns A Promise that resolves to the created academic semester.
 * @throws An ApiError with a status code of 400 (Bad Request) if the semester code is invalid.
 */
const createSemester = async (
  payload: AcademicSemesterType
): Promise<AcademicSemesterType> => {
  // Check if the provided semester code matches the title using the academicSemesterTitleCodeMapper
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code!');
  }

  // Create the academic semester in the database using the payload
  const result = await AcademicSemester.create(payload);

  // Return the created academic semester
  return result;
};

/**
 * getAllSemesters is an asynchronous function that retrieves academic semesters based on provided filters and pagination options.
 * It accepts filters and pagination options as parameters.
 * @param filters The filters object containing the searchTerm and other filter data.
 * @param paginationOptions The pagination options object specifying the page, limit, sortBy, and sortOrder.
 * @returns A Promise that resolves to the response containing the retrieved academic semesters.
 */
const getAllSemesters = async (
  filters: FilterType,
  paginationOptions: PaginationOptionType
): Promise<GenericResponseType<AcademicSemesterType[]>> => {
  // Destructure the searchTerm and remaining filters from the filters object
  const { searchTerm, ...filtersData } = filters;

  // Initialize an array to hold the conditions for the $and operator
  const andCondition = [];

  // Check if searchTerm is provided
  if (searchTerm) {
    // Create $or conditions for each searchable field and push them to andCondition array
    andCondition.push({
      $or: academicSemesterSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // Check if any other filters are provided
  if (Object.keys(filtersData).length) {
    // Create $and conditions for each filter field and value pair and push them to andCondition array
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Calculate pagination options
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelpers.calculationPagination(paginationOptions);

  // Initialize an object to hold sort conditions
  const sortConditions: { [key: string]: SortOrder } = {};

  // Check if sortBy and sortOrder are provided
  if (sortBy && sortOrder) {
    // Set the sortConditions object with the provided sortBy and sortOrder
    sortConditions[sortBy] = sortOrder;
  }

  // Create whereConditions based on andCondition array
  const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {};

  // Query the database to retrieve academic semesters based on the filters, pagination, and sorting
  const result = await AcademicSemester.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  // Count the total number of academic semesters
  const total = await AcademicSemester.countDocuments();

  // Construct and return the response object containing the meta and data
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

/**
 * getSingleSemester is an asynchronous function that retrieves a single academic semester by its ID.
 * It accepts the ID of the academic semester as a parameter.
 * @param id The ID of the academic semester to retrieve.
 * @returns A Promise that resolves to the retrieved academic semester, or null if not found.
 */
const getSingleSemester = async (
  id: string
): Promise<AcademicSemesterType | null> => {
  // Query the database to retrieve the academic semester by its ID
  const result = await AcademicSemester.findById(id);

  // Return the retrieved academic semester, or null if not found
  return result;
};

/**
 * updateSemester is an asynchronous function that updates a single academic semester by its ID and .
 * It accepts the ID of the academic semester as a parameter.
 * @param id The ID of the academic semester to retrieve.
 * @returns A Promise that resolves to the retrieved academic semester, or null if not found.
 */
const updateSemester = async (
  id: string,
  payload: Partial<AcademicSemesterType>
): Promise<AcademicSemesterType | null> => {
  // Check if the provided semester code matches the title using the academicSemesterTitleCodeMapper
  if (
    payload.title &&
    payload.code &&
    academicSemesterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code!'); // Throw an error if the provided semester code does not match the title
  } else if (payload.title && payload.year) {
    const isExist = await AcademicSemester.findOne({
      title: payload.title,
      year: payload.year,
    }); // Check if an academic semester with the same title and year already exists
    if (isExist) {
      throw new ApiError(
        httpStatus.CONFLICT,
        'Academic semester is already exist!'
      ); // Throw an error if the academic semester already exists
    }
  }

  // Query the database to update the academic semester by its ID
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true, // Return the updated document
    runValidators: true, // Run validators during the update operation
  });

  // Return the updated academic semester, or null if not found
  return result;
};

/**
 * deleteSemester is an asynchronous function that delete a single academic semester by its ID.
 * It accepts the ID of the academic semester as a parameter.
 * @param id The ID of the academic semester to retrieve.
 * @returns A Promise that resolves to the retrieved academic semester, or null if not found.
 */
const deleteSemester = async (
  id: string
): Promise<AcademicSemesterType | null> => {
  // Query the database to update the academic semester by its ID
  const result = await AcademicSemester.findByIdAndDelete(id);

  // Return the updated academic semester, or null if not found
  return result;
};

export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
