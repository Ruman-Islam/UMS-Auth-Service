import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';

// Define the user schema using the IUser interface
const userSchema = new Schema<IUser>(
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
  },
  { timestamps: true }
);

// Create and export the User model based on the user schema
export const User = model<IUser, UserModel>('User', userSchema);

// This code defines a Mongoose schema for the User model using the IUser interface.
// The userSchema specifies the fields and their types, along with any validation rules.

// The User model is created using the mongoose.model() function, which takes two generic type parameters:
// - IUser: Represents the shape of the user document.
// - UserModel: Represents the type of the Mongoose model.

// The 'User' string is the name of the collection in MongoDB where the documents will be stored.
// It is followed by the userSchema, which defines the structure and validation rules for the documents.

// The resulting User model can be used to perform CRUD operations and other interactions with the MongoDB collection.
