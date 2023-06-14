import { SortOrder } from 'mongoose';
import { PaginationHelpers } from '../../../helper/paginationHelper';
import {
  GenericResponseType,
  PaginationOptionType,
} from '../../../interface/common';
import { academicFacultySearchableFields } from './academicFaculty.constant';
import {
  AcademicFacultyFilterType,
  AcademicFacultyType,
} from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createFaculty = async (
  payload: AcademicFacultyType
): Promise<AcademicFacultyType> => {
  // Create the academic faculty in the database using the payload
  const result = await AcademicFaculty.create(payload);

  // Return the created academic faculty
  return result;
};

const getAllFaculties = async (
  filters: AcademicFacultyFilterType,
  paginationOptions: PaginationOptionType
): Promise<GenericResponseType<AcademicFacultyType[]>> => {
  // Destructure the searchTerm and remaining filters from the filters object
  const { searchTerm, ...filtersData } = filters;

  // Initialize an array to hold the conditions for the $and operator
  const andCondition = [];

  // Check if searchTerm is provided
  if (searchTerm) {
    // Create $or conditions for each searchable field and push them to andCondition array
    andCondition.push({
      $or: academicFacultySearchableFields.map(field => ({
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

  // Query the database to retrieve academic Faculty based on the filters, pagination, and sorting
  const result = await AcademicFaculty.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  // Count the total number of academic Faculty
  const total = await AcademicFaculty.countDocuments(whereConditions);

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

const getSingleFaculty = async (
  id: string
): Promise<AcademicFacultyType | null> => {
  // Query the database to retrieve the academic faculty by its ID
  const result = await AcademicFaculty.findById(id);

  // Return the retrieved academic faculty, or null if not found
  return result;
};

const updateFaculty = async (
  id: string,
  payload: Partial<AcademicFacultyType>
): Promise<AcademicFacultyType | null> => {
  const isExists = await AcademicFaculty.findOne({ title: payload.title });

  if (isExists) {
    throw new ApiError(httpStatus.CONFLICT, 'Faculty is already exists');
  }

  // Query the database to update the academic faculty by its ID
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true, // Return the updated document
    runValidators: true, // Run validators during the update operation
  });

  // Return the updated academic faculty, or null if not found
  return result;
};

const deleteFaculty = async (
  id: string
): Promise<AcademicFacultyType | null> => {
  // Query the database to update the academic faculty by its ID
  const result = await AcademicFaculty.findByIdAndDelete(id);

  // Return the updated academic faculty, or null if not found
  return result;
};

export const AcademicFacultyService = {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
