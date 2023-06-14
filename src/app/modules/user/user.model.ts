import { Schema, model } from 'mongoose';
import { UserType, UserModel } from './user.interface';

// Define the user schema using the UserType interface
const userSchema = new Schema<UserType>(
  {
    id: {
      type: String,
      required: [true, 'id is missing!'],
      unique: true,
    },
    role: {
      type: String,
      required: [true, 'role is missing!'],
    },
    password: {
      type: String,
      required: [true, 'password is missing!'],
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// Create and export the User model based on the user schema
export const User = model<UserType, UserModel>('User', userSchema);
