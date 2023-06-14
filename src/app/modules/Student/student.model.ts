import { Schema, model } from 'mongoose';
import { StudentModel, StudentType } from './student.interface';
import { bloodGroup, gender } from './student.constant';

export const StudentSchema = new Schema<StudentType, StudentModel>(
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
    gender: {
      type: String,
      required: [true, 'gender is missing!'],
      enum: {
        values: gender,
        message: '{VALUE} is not matched',
      },
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
    guardian: {
      required: [true, 'guardian is missing!'],
      type: {
        fatherName: {
          type: String,
          required: [true, 'father name is missing!'],
        },
        fatherOccupation: {
          type: String,
          required: [true, 'father occupation is missing!'],
        },
        fatherContactNo: {
          type: String,
          required: [true, 'father contact is missing!'],
        },
        motherName: {
          type: String,
          required: [true, 'mother name is missing!'],
        },
        motherOccupation: {
          type: String,
          required: [true, 'mother occupation is missing!'],
        },
        motherContactNo: {
          type: String,
          required: [true, 'mother contact is missing!'],
        },
        address: {
          type: String,
          required: [true, 'guardian address is missing!'],
        },
      },
    },
    localGuardian: {
      required: [true, 'local guardian is missing!'],
      type: {
        name: {
          type: String,
          required: [true, 'local guardian name is missing!'],
        },
        occupation: {
          type: String,
          required: [true, 'local guardian occupation is missing!'],
        },
        contactNo: {
          type: String,
          required: [true, 'local guardian contact is missing!'],
        },
        address: {
          type: String,
          required: [true, 'local guardian address is missing!'],
        },
      },
    },
    profileImage: {
      type: String,
      // required: [true, 'image url is missing!'],
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
      required: [true, 'academic semester missing!'],
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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Student = model<StudentType, StudentModel>(
  'Student',
  StudentSchema
);
