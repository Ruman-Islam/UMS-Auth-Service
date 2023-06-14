import { SortOrder } from 'mongoose';
import { PaginationHelpers } from '../../../helper/paginationHelper';
import {
  GenericResponseType,
  PaginationOptionType,
} from '../../../interface/common';
import { managementDepartmentsSearchableFields } from './managementDepartment.constant';
import {
  ManagementDepartmentFilterType,
  ManagementDepartmentType,
} from './managementDepartment.interface';
import { ManagementDepartment } from './managementDepartment.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createManagementDepartment = async (
  payload: ManagementDepartmentType
): Promise<ManagementDepartmentType | null> => {
  const createdManagementDepartment = await ManagementDepartment.create(
    payload
  );
  return createdManagementDepartment;
};

const getAllManagementDepartments = async (
  filters: ManagementDepartmentFilterType,
  paginationOptions: PaginationOptionType
): Promise<GenericResponseType<ManagementDepartmentType[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const andCondition = [];

  // Generating partial search mechanism
  if (searchTerm) {
    andCondition.push({
      $or: managementDepartmentsSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // Generating filter search mechanism
  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // It calculates the pagination parameters such as page, limit, skip, sortBy, and sortOrder using the PaginationHelpers.calculationPagination function.
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelpers.calculationPagination(paginationOptions);

  // It initializes an empty object sortConditions to hold the sorting conditions.
  const sortConditions: { [key: string]: SortOrder } = {};

  // If sortBy and sortOrder are provided, it assigns them to the sortConditions object.
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // It ensures that if andCondition is empty thant send empty object otherwise it will occurs an error
  const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {};

  // It queries the User collection, sorts the results based on the sortConditions, skips the specified number of documents, and limits the number of documents to retrieve.
  const result = await ManagementDepartment.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  // It retrieves the total count of users using the ManagementDepartment.countDocuments function.
  const total = await ManagementDepartment.countDocuments(whereConditions);

  // It returns a Promise that resolves to a GenericResponseType containing the retrieved users and the pagination metadata.
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleManagementDepartment = async (
  id: string
): Promise<ManagementDepartmentType | null> => {
  // Use the ManagementDepartmentType model's findById method to query the database for the ManagementDepartmentType with the specified ID
  const result = await ManagementDepartment.findById(id);

  // Return the result, which can be either the retrieved ManagementDepartmentType or null if not found
  return result;
};

const updateManagementDepartment = async (
  id: string,
  payload: ManagementDepartmentType
): Promise<ManagementDepartmentType | null> => {
  if (!payload?.title) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Title is missing!');
  }

  const isExist = await ManagementDepartment.findOne({
    title: payload.title,
  });

  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Management Department is already exist!'
    );
  }

  const result = await ManagementDepartment.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true }
  );

  // Return the result, which can be either the retrieved ManagementDepartmentType or null if not found
  return result;
};

export const ManagementDepartmentService = {
  createManagementDepartment,
  getAllManagementDepartments,
  getSingleManagementDepartment,
  updateManagementDepartment,
};
