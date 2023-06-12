import { Schema, model } from 'mongoose';
import {
  AcademicSemesterModel,
  AcademicSemesterType,
} from './academicSemester.interface';
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from './academicSemester.constant';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

// Defining the Mongoose schema for academic semesters
const academicSemesterSchema = new Schema<AcademicSemesterType>(
  {
    title: {
      type: String,
      required: [true, 'semester title is missing!'],
      enum: {
        values: academicSemesterTitles,
        message: '{VALUE} is not matched',
      }, // Allow only the predefined academic semester titles,
    },
    year: {
      type: String,
      required: [true, 'semester year is missing!'],
    },
    code: {
      type: String,
      required: [true, 'semester code is missing!'],
      enum: {
        values: academicSemesterCodes,
        message: '{VALUE} does not match!',
      }, // Allow only the predefined academic semester codes,
    },
    startMonth: {
      type: String,
      required: [true, 'starting month is missing!'],
      enum: {
        values: academicSemesterMonths,
        message: '{VALUE} does not match!',
      }, // Allow only the predefined academic semester months,
    },
    endMonth: {
      type: String,
      required: [true, 'ending month is missing!'],
      enum: {
        values: academicSemesterMonths,
        message: '{VALUE} does not match!',
      }, // Allow only the predefined academic semester months,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

/**
@param The function you provided is a pre-save hook in Mongoose, a Node.js library for MongoDB.
@param In Mongoose, a pre-save hook is a middleware function that is executed before saving a document to the database. It allows you to perform certain actions or validations before the document is saved.
@param In your specific code snippet, the pre-save hook is defined on the academicSemesterSchema. When a document of the AcademicSemester model is being saved, this hook is triggered.
@param This pre-save hook is useful for enforcing uniqueness constraints or performing checks before saving a document to ensure data integrity in the database.
@param Regenerate response
 */
// Same year and same semester validation
academicSemesterSchema.pre('save', async function (next) {
  // Check if an academic semester with the same title and year already exists
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });

  // If the academic semester doesn't exist, proceed to the next middleware/handler
  if (!isExist) {
    next();
  } else {
    // If the academic semester already exists, throw an ApiError with a status code of 409 (Conflict) and an error message
    throw new ApiError(
      httpStatus.CONFLICT,
      'Academic semester is already exist!'
    );
  }
});

// Create the Mongoose model for academic semesters
export const AcademicSemester = model<
  AcademicSemesterType,
  AcademicSemesterModel
>('AcademicSemester', academicSemesterSchema);
