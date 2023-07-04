import { Schema, model } from 'mongoose';
import { UserType, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';

// Define the user schema using the UserType interface
const userSchema = new Schema<UserType, UserModel>(
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
      select: 0,
      required: [true, 'password is missing!'],
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangeAt: {
      type: Date,
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

// userSchema.methods.isUserExist = async function (
//   id: string
// ): Promise<Partial<UserType> | null> {
//   return await User.findOne(
//     { id },
//     { id: 1, role: 1, needsPasswordChange: 1, password: 1 }
//   );
// };

// userSchema.methods.isPasswordMatched = async function (
// givenPassword: string,
// savedPassword: string
// ): Promise<boolean> {
//   return await bcrypt.compare(givenPassword, savedPassword);
// };

userSchema.statics.isUserExist = async function (
  id: string
): Promise<Pick<
  UserType,
  'id' | 'password' | 'role' | 'needsPasswordChange'
> | null> {
  return await User.findOne(
    { id },
    { id: 1, password: 1, role: 1, needsPasswordChange: 1 }
  );
};

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

userSchema.pre('save', async function (next) {
  // Hash password
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password as string,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

// Create and export the User model based on the user schema
export const User = model<UserType, UserModel>('User', userSchema);
