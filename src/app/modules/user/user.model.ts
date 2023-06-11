import { Schema, model } from 'mongoose';
import { UserType, UserModel } from './user.interface';

// This code defines a Mongoose schema for the User model using the UserType interface.
// The userSchema specifies the fields and their types, along with any validation rules.

// The User model is created using the mongoose.model() function, which takes two generic type parameters:
// - UserType: Represents the shape of the user document.
// - UserModel: Represents the type of the Mongoose model.

// The 'User' string is the name of the collection in MongoDB where the documents will be stored.
// It is followed by the userSchema, which defines the structure and validation rules for the documents.

// The resulting User model can be used to perform CRUD operations and other interactions with the MongoDB collection.

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
  },
  { timestamps: true }
);

// Create and export the User model based on the user schema
export const User = model<UserType, UserModel>('User', userSchema);
