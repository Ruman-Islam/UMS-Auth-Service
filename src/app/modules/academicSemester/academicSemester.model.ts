import { Schema, model } from 'mongoose';
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from './academicSemester.interface';
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from './academicSemester.constant';

// Define the Mongoose schema for academic semesters
const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: {
        values: academicSemesterTitles, // Allow only the predefined academic semester titles
        message: '{VALUE} is invalid', // Error message for invalid values
      },
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: {
        values: academicSemesterCodes, // Allow only the predefined academic semester codes
        message: '{VALUE} is invalid', // Error message for invalid values
      },
    },
    startMonth: {
      type: String,
      required: true,
      enum: {
        values: academicSemesterMonths, // Allow only the predefined academic semester months
        message: '{VALUE} is invalid', // Error message for invalid values
      },
    },
    endMonth: {
      type: String,
      required: true,
      enum: {
        values: academicSemesterMonths, // Allow only the predefined academic semester months
        message: '{VALUE} is invalid', // Error message for invalid values
      },
    },
  },
  { timestamps: true }
);

// Create the Mongoose model for academic semesters
export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
);
