import { Model } from 'mongoose';

// Define the shape of a user
export type IUser = {
  id: string; // User ID
  role: string; // User role
  password?: string; // Optional password
};

// Define the user model type using the Mongoose Model interface
export type UserModel = Model<IUser, Record<string, unknown>>;

// This module exports the IUser and UserModel types, which can be used
// for defining and interacting with user documents in Mongoose.
// The IUser type represents the shape of a user document, while the
// UserModel type represents the Mongoose model used for querying and
// manipulating user data.
