import mongoose, { SortOrder } from 'mongoose';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { PaginationHelpers } from '../../../helper/paginationHelper';
import {
  FilterType,
  GenericResponseType,
  PaginationOptionType,
} from '../../../interface/common';
import { UserType } from './user.interface';
import { User } from './user.model';
import { userSearchableFields } from './user.constant';
import { StudentType } from '../Student/student.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import { Student } from '../Student/student.model';
import httpStatus from 'http-status';
import { FacultyType } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { AdminType } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';

const createStudent = async (
  student: StudentType,
  user: UserType
): Promise<UserType | null> => {
  // Default password setting
  if (!user.password) {
    user.password = config?.default_student_pass as string;
  }

  // setting role
  user.role = 'student';

  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  );

  // Generate student id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateStudentId(academicSemester);
    user.id = id;
    student.id = id;

    // Now it is an array because of using transaction. transaction returns array
    const newStudent = await Student.create([student], { session });

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    // setting student _id into user.student
    user.student = newStudent[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user!');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }

  // user --> student --> academicSemester, academicDepartment, academicFaculty
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  return newUserAllData;
};

const createFaculty = async (
  faculty: FacultyType,
  user: UserType
): Promise<UserType | null> => {
  // Default password setting
  if (!user.password) {
    user.password = config?.default_faculty_pass as string;
  }

  // setting role
  user.role = 'faculty';

  // Generate Faculty id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateFacultyId();
    user.id = id;
    faculty.id = id;

    // Now it is an array because of using transaction. transaction returns array
    const newFaculty = await Faculty.create([faculty], { session });

    if (!newFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    // setting Faculty _id into user.Faculty
    user.faculty = newFaculty[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user!');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }

  // user --> Faculty --> academicDepartment, academicFaculty
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  return newUserAllData;
};

const createAdmin = async (
  admin: AdminType,
  user: UserType
): Promise<UserType | null> => {
  // Default password setting
  if (!user.password) {
    user.password = config?.default_admin_pass as string;
  }

  // setting role
  user.role = 'admin';

  // Generate Admin id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateAdminId();
    user.id = id;
    admin.id = id;

    // Now it is an array because of using transaction. transaction returns array
    const newAdmin = await Admin.create([admin], { session });

    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin!');
    }

    // setting Admin _id into user.Admin
    user.admin = newAdmin[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user!');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'admin',
      populate: [
        {
          path: 'managementDepartment',
        },
      ],
    });
  }

  return newUserAllData;
};

const getAllUsers = async (
  filters: FilterType,
  paginationOptions: PaginationOptionType
): Promise<GenericResponseType<UserType[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const andCondition = [];

  // Generating partial search mechanism
  if (searchTerm) {
    andCondition.push({
      $or: userSearchableFields.map(field => ({
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
  const result = await User.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  // It retrieves the total count of users using the User.countDocuments function.
  const total = await User.countDocuments(whereConditions);

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

const getSingleUser = async (id: string): Promise<UserType | null> => {
  // Use the User model's findById method to query the database for the user with the specified ID
  const result = await User.findById(id);

  // Return the result, which can be either the retrieved user or null if not found
  return result;
};

export const UserService = {
  createStudent,
  createFaculty,
  createAdmin,
  getAllUsers,
  getSingleUser,
};
