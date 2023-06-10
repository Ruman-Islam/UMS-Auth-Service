import { SortOrder } from 'mongoose';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { PaginationHelpers } from '../../../helper/paginationHelper';
import {
  GenericResponseType,
  PaginationOptionType,
} from '../../../interface/common';
import { UserType } from './user.interface';
import { User } from './user.model';
import { generateUserId } from './user.utils';

// This code exports a UserService object that provides the createUser method.

/** The createUser method accepts a user object and performs the following steps:
1. Generates an auto-generated incremental id using generateUserId().
2. Sets the id property of the user object.
3. Checks if the user object has a password. If not, sets it to the default_user_pass value from the config.
4. Creates a new user in the database using User.create().
5. If the creation is successful, returns the createdUser.
6. If the creation fails, throws an ApiError with a status code of 400 and an error message.
*/
// The UserService object is exported to be used in other parts of the application.
const createUser = async (user: UserType): Promise<UserType | null> => {
  /* Need
    1. auto generated incremental id
    2. default password
    */

  const id = await generateUserId();
  user.id = id;

  if (!user.password) {
    user.password = config?.default_user_pass as string;
  }

  const createdUser = await User.create(user);

  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user!');
  }
  return createdUser;
};

/**
 * getAllUsers is an asynchronous function that retrieves all users based on the provided pagination options.
 * It calculates the pagination parameters such as page, limit, skip, sortBy, and sortOrder using the PaginationHelpers.calculationPagination function.
 * It initializes an empty object sortConditions to hold the sorting conditions.
 * If sortBy and sortOrder are provided, it assigns them to the sortConditions object.
 * It queries the User collection, sorts the results based on the sortConditions, skips the specified number of documents, and limits the number of documents to retrieve.
 * It retrieves the total count of users using the User.countDocuments function.
 * It returns a Promise that resolves to a GenericResponseType containing the retrieved users and the pagination metadata.
 * @param paginationOptions The pagination options used to retrieve users.
 * @returns A Promise that resolves to a GenericResponseType containing the retrieved users and the pagination metadata.
 */
const getAllUsers = async (
  paginationOptions: PaginationOptionType
): Promise<GenericResponseType<UserType[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelpers.calculationPagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await User.find({})
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const UserService = {
  createUser,
  getAllUsers,
};
