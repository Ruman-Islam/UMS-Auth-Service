/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GenericResponseType,
  PaginationOptionType,
} from '../../../interface/common';
import { PaginationHelpers } from '../../../helper/paginationHelper';
import { SortOrder } from 'mongoose';
import { FacultyFilterType, FacultyType } from './faculty.interface';
import { facultySearchableFields } from './faculty.constant';
import { Faculty } from './faculty.model';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
//   import { StudentFilterType, StudentType } from './student.interface';
//   import { studentSearchableFields } from './student.constant';
//   import { Student } from './student.model';
//   import ApiError from '../../../errors/ApiError';
//   import httpStatus from 'http-status';

const getAllFaculties = async (
  filters: FacultyFilterType,
  paginationOptions: PaginationOptionType
): Promise<GenericResponseType<FacultyType[]>> => {
  // Destructure the searchTerm and remaining filters from the filters object
  const { searchTerm, ...filtersData } = filters;

  // Initialize an array to hold the conditions for the $and operator
  const andCondition = [];

  // Check if searchTerm is provided
  if (searchTerm) {
    // Create $or conditions for each searchable field and push them to andCondition array
    andCondition.push({
      $or: facultySearchableFields.map(field => ({
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

  // Query the database to retrieve faculty based on the filters, pagination, and sorting
  const result = await Faculty.find(whereConditions)
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  // Count the total number of faculty
  const total = await Faculty.countDocuments(whereConditions);

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

const getSingleFaculty = async (id: string): Promise<FacultyType | null> => {
  // Query the database to retrieve the academic semester by its ID
  const result = await Faculty.findById(id)
    .populate('academicDepartment')
    .populate('academicFaculty');

  // Return the retrieved Faculty, or null if not found
  return result;
};

const updateFaculty = async (
  id: string,
  payload: Partial<FacultyType>
): Promise<FacultyType | null> => {
  const isExist = await Faculty.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found!');
  }

  const { name, ...studentData } = payload;

  const updatedFacultyData: Partial<FacultyType> = { ...studentData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updatedFacultyData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  // Query the database to update the faculty by its ID
  const result = await Faculty.findOneAndUpdate({ id }, updatedFacultyData, {
    new: true, // Return the updated document
    runValidators: true, // Run validators during the update operation
  });

  // Return the updated faculty, or null if not found
  return result;
};

const deleteSingleFaculty = async (id: string): Promise<FacultyType | null> => {
  // Query the database to update the faculty by its ID
  const result = await Faculty.findByIdAndDelete(id)
    .populate('academicDepartment')
    .populate('academicFaculty');

  // Return the updated faculty, or null if not found
  return result;
};

export const FacultyService = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteSingleFaculty,
};
