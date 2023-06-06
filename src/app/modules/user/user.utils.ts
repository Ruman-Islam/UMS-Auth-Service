import { User } from './user.model';

/** 
 The findLastUserId function retrieves the ID of the last created user by querying the database and sorting the users by their creation timestamps in descending order. It returns the ID of the last user found.
 */
export const findLastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastUser?.id;
};

/** 
 The generateUserId function generates a new user ID by incrementing the last ID retrieved using findLastUserId. If no last ID is found, it defaults to '00000'. The ID is incremented by 1 and padded with leading zeros to ensure a fixed length of 5 characters. The generated ID is then returned.
 */
export const generateUserId = async () => {
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, '0');

  // increment by 1
  const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  return incrementedId;
};

/** This code exports two utility functions for generating and retrieving user IDs.

These utility functions can be used in the createUser function or any other parts of the application where user IDs are needed.
*/
