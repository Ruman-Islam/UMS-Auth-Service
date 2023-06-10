import { Model } from 'mongoose';

// Define the shape of a user
export type UserType = {
  id: string; // User ID
  role: string; // User role
  password?: string; // Optional password
};

// Define the user model type using the Mongoose Model interface
export type UserModel = Model<UserType, Record<string, unknown>>;

// This module exports the UserType and UserModel types, which can be used
// for defining and interacting with user documents in Mongoose.
// The UserType type represents the shape of a user document, while the
// UserModel type represents the Mongoose model used for querying and
// manipulating user data.
