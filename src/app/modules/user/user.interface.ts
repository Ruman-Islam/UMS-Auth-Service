/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { StudentType } from '../Student/student.interface';
import { FacultyType } from '../faculty/faculty.interface';

// Define the shape of a user
export type UserType = {
  id: string; // User ID
  role: string; // User role
  password: string; // Optional password
  needsPasswordChange: true | false;
  passwordChangeAt?: Date;
  student?: Types.ObjectId | StudentType; // Ref type in model
  faculty?: Types.ObjectId | FacultyType; // Ref type in model
  admin?: Types.ObjectId /* | adminType */; // Ref type in model
};

// export type UserMethodType = {
//   isUserExist(id: string): Promise<Partial<UserType> | null>;
//   isPasswordMatched(
// givenPassword: string,
// savedPassword: string
//   ): Promise<boolean>;
// };

export type UserModel = {
  isUserExist(
    id: string
  ): Promise<
    Pick<UserType, 'id' | 'password' | 'role' | 'needsPasswordChange'>
  >;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<UserType>;

// Define the user model type using the Mongoose Model interface
// export type UserModel = Model<
//   UserType,
//   Record<string, unknown>,
//   UserMethodType
// >;
