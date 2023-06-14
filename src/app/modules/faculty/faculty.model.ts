import { Schema, model } from 'mongoose';
import { FacultyModel, FacultyType } from './faculty.interface';
import { bloodGroup, designation, gender } from './faculty.constant';

export const FacultySchema = new Schema<FacultyType, FacultyModel>(
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
    gender: {
      type: String,
      required: [true, 'gender is missing!'],
      enum: {
        values: gender,
        message: '{VALUE} is not matched',
      },
    },
    bloodGroup: {
      type: String,
      enum: {
        values: bloodGroup,
        message: '{VALUE} is not matched',
      },
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
    presentAddress: {
      type: String,
      required: [true, 'present address is missing!'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'permanent address is missing!'],
    },
    designation: {
      type: String,
      enum: designation,
      required: [true, 'designation is missing!'],
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
      required: [true, 'academic department is missing!'],
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: [true, 'academic faculty is missing!'],
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

export const Faculty = model<FacultyType, FacultyModel>(
  'Faculty',
  FacultySchema
);
