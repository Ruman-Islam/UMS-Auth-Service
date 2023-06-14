/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GenericResponseType,
  PaginationOptionType,
} from '../../../interface/common';
import { PaginationHelpers } from '../../../helper/paginationHelper';
import { SortOrder } from 'mongoose';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { AdminFilterType, AdminType } from './admin.interface';
import { adminSearchableFields } from './admin.constant';
import { Admin } from './admin.model';

const getAllAdmins = async (
  filters: AdminFilterType,
  paginationOptions: PaginationOptionType
): Promise<GenericResponseType<AdminType[]>> => {
  // Destructure the searchTerm and remaining filters from the filters object
  const { searchTerm, ...filtersData } = filters;

  // Initialize an array to hold the conditions for the $and operator
  const andCondition = [];

  // Check if searchTerm is provided
  if (searchTerm) {
    // Create $or conditions for each searchable field and push them to andCondition array
    andCondition.push({
      $or: adminSearchableFields.map(field => ({
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

  // Query the database to retrieve Admin based on the filters, pagination, and sorting
  const result = await Admin.find(whereConditions)
    .populate('managementDepartment')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  // Count the total number of Admin
  const total = await Admin.countDocuments(whereConditions);

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

const getSingleAdmin = async (id: string): Promise<AdminType | null> => {
  // Query the database to retrieve the academic semester by its ID
  const result = await Admin.findById(id).populate('managementDepartment');

  // Return the retrieved Faculty, or null if not found
  return result;
};

const updateAdmin = async (
  id: string,
  payload: Partial<AdminType>
): Promise<AdminType | null> => {
  const isExist = await Admin.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found!');
  }

  const { name, ...studentData } = payload;

  const updatedAdminData: Partial<AdminType> = { ...studentData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updatedAdminData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  // Query the database to update the Admin by its ID
  const result = await Admin.findOneAndUpdate({ id }, updatedAdminData, {
    new: true, // Return the updated document
    runValidators: true, // Run validators during the update operation
  });

  // Return the updated Admin, or null if not found
  return result;
};

const deleteSingleAdmin = async (id: string): Promise<AdminType | null> => {
  // Query the database to update the Admin by its ID
  const result = await Admin.findByIdAndDelete(id).populate(
    'managementDepartment'
  );

  // Return the updated faculty, or null if not found
  return result;
};

export const AdminService = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteSingleAdmin,
};
