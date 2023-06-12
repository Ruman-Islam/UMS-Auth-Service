import { SortOrder } from 'mongoose';
import { PaginationHelpers } from '../../../helper/paginationHelper';
import {
  FilterType,
  GenericResponseType,
  PaginationOptionType,
} from '../../../interface/common';
import { academicDepartmentSearchableFields } from './academicDepartment.constant';
import { AcademicDepartmentType } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';

const createDepartment = async (
  payload: AcademicDepartmentType
): Promise<AcademicDepartmentType> => {
  // Create the academic Department in the database using the payload
  const result = await AcademicDepartment.create(payload);

  // Return the created academic Department
  return result;
};

const getAllDepartment = async (
  filters: FilterType,
  paginationOptions: PaginationOptionType
): Promise<GenericResponseType<AcademicDepartmentType[]>> => {
  // Destructure the searchTerm and remaining filters from the filters object
  const { searchTerm, ...filtersData } = filters;

  // Initialize an array to hold the conditions for the $and operator
  const andCondition = [];

  // Check if searchTerm is provided
  if (searchTerm) {
    // Create $or conditions for each searchable field and push them to andCondition array
    andCondition.push({
      $or: academicDepartmentSearchableFields.map(field => ({
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

  // Query the database to retrieve academic Department based on the filters, pagination, and sorting
  const result = await AcademicDepartment.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  // Count the total number of academic Department
  const total = await AcademicDepartment.countDocuments();

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

const getSingleDepartment = async (
  id: string
): Promise<AcademicDepartmentType | null> => {
  // Query the database to retrieve the academic DegetSingleDepartment by its ID
  const result = await AcademicDepartment.findById(id);

  // Return the retrieved academic Department, or null if not found
  return result;
};

const updateDepartment = async (
  id: string,
  payload: Partial<AcademicDepartmentType>
): Promise<AcademicDepartmentType | null> => {
  const isExists = await AcademicDepartment.findOne({ title: payload.title });

  if (isExists) {
    throw new ApiError(httpStatus.CONFLICT, 'Department is already exists');
  }

  // Query the database to update the academic Department by its ID
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true, // Return the updated document
      runValidators: true, // Run validators during the update operation
    }
  );

  // Return the updated academic Department, or null if not found
  return result;
};

const deleteDepartment = async (
  id: string
): Promise<AcademicDepartmentType | null> => {
  // Query the database to update the academic Department by its ID
  const result = await AcademicDepartment.findByIdAndDelete(id);

  // Return the updated academic Department, or null if not found
  return result;
};

export const AcademicDepartmentService = {
  createDepartment,
  getAllDepartment,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
