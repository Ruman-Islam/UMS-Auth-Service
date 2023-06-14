/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GenericResponseType,
  PaginationOptionType,
} from '../../../interface/common';
import { PaginationHelpers } from '../../../helper/paginationHelper';
import { SortOrder } from 'mongoose';
import { StudentFilterType, StudentType } from './student.interface';
import { studentSearchableFields } from './student.constant';
import { Student } from './student.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const getAllStudents = async (
  filters: StudentFilterType,
  paginationOptions: PaginationOptionType
): Promise<GenericResponseType<StudentType[]>> => {
  // Destructure the searchTerm and remaining filters from the filters object
  const { searchTerm, ...filtersData } = filters;

  // Initialize an array to hold the conditions for the $and operator
  const andCondition = [];

  // Check if searchTerm is provided
  if (searchTerm) {
    // Create $or conditions for each searchable field and push them to andCondition array
    andCondition.push({
      $or: studentSearchableFields.map(field => ({
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
  const result = await Student.find(whereConditions)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  // Count the total number of academic semesters
  const total = await Student.countDocuments(whereConditions);

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

const getSingleStudent = async (id: string): Promise<StudentType | null> => {
  // Query the database to retrieve the academic semester by its ID
  const result = await Student.findById(id)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');

  // Return the retrieved academic semester, or null if not found
  return result;
};

const updateStudent = async (
  id: string,
  payload: Partial<StudentType>
): Promise<StudentType | null> => {
  const isExist = await Student.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found!');
  }

  const { name, guardian, localGuardian, ...studentData } = payload;

  const updatedStudentData: Partial<StudentType> = { ...studentData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const guardianKey = `guardian.${key}` as keyof Partial<StudentType>;
      (updatedStudentData as any)[guardianKey] =
        guardian[key as keyof typeof guardian];
    });
  }

  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach(key => {
      const localGuardianKey =
        `localGuardian.${key}` as keyof Partial<StudentType>;
      (updatedStudentData as any)[localGuardianKey] =
        localGuardian[key as keyof typeof localGuardian];
    });
  }

  // Query the database to update the academic semester by its ID
  const result = await Student.findOneAndUpdate({ id }, updatedStudentData, {
    new: true, // Return the updated document
    runValidators: true, // Run validators during the update operation
  });

  // Return the updated academic semester, or null if not found
  return result;
};

const deleteSingleStudent = async (id: string): Promise<StudentType | null> => {
  // Query the database to update the academic semester by its ID
  const result = await Student.findByIdAndDelete(id)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');

  // Return the updated academic semester, or null if not found
  return result;
};

export const StudentService = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteSingleStudent,
};
