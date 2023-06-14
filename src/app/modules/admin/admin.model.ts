import { Schema, model } from 'mongoose';
import { AdminModel, AdminType } from './admin.interface';
import { bloodGroup, adminDesignation, gender } from './admin.constant';

const AdminSchema = new Schema<AdminType, AdminModel>(
  {
    id: {
      type: String,
      required: [true, 'id is missing!'],
      unique: true,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: [true, 'first name is missing!'],
        },
        middleName: {
          type: String,
        },
        lastName: {
          type: String,
          required: [true, 'last name is missing!'],
        },
      },
      required: [true, 'name is missing!'],
    },
    dateOfBirth: {
      type: String,
      required: [true, 'date of birth is missing!'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'email is missing!'],
    },
    contactNo: {
      type: String,
      unique: true,
      required: [true, 'contact is missing!'],
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'emergency contact is missing!'],
    },
    gender: {
      type: String,
      required: [true, 'gender is missing!'],
      enum: {
        values: gender,
        message: '{VALUE} is not matched',
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'present address is missing!'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'permanent address is missing!'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: bloodGroup,
        message: '{VALUE} is not matched',
      },
    },
    managementDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'ManagementDepartment',
      required: [true, 'management department is missing!'],
    },
    designation: {
      type: String,
      enum: {
        values: adminDesignation,
        message: '{VALUE} is not matched',
      },
      required: [true, 'designation is missing!'],
    },
    profileImage: {
      type: String,
      // required: [true, 'image url is missing!'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Admin = model<AdminType, AdminModel>('Admin', AdminSchema);
