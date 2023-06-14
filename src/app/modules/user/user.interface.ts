import { Model, Types } from 'mongoose';
import { StudentType } from '../Student/student.interface';
import { FacultyType } from '../faculty/faculty.interface';

// Define the shape of a user
export type UserType = {
  id: string; // User ID
  role: string; // User role
  password?: string; // Optional password
  student?: Types.ObjectId | StudentType; // Ref type in model
  faculty?: Types.ObjectId | FacultyType; // Ref type in model
  admin?: Types.ObjectId /* | adminType */; // Ref type in model
};

// Define the user model type using the Mongoose Model interface
export type UserModel = Model<UserType, Record<string, unknown>>;
