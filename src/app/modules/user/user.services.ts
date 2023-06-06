import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
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
const createUser = async (user: IUser): Promise<IUser | null> => {
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

export const UserService = {
  createUser,
};
