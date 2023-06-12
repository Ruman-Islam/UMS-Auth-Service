import { Schema, model } from 'mongoose';
import {
  AcademicFacultyModel,
  AcademicFacultyType,
} from './academicFaculty.interface';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';

const academicFacultySchema = new Schema<AcademicFacultyType>({
  title: {
    type: String,
    required: [true, 'faculty title is missing!'],
  },
});

// Same year and same Faculty validation
academicFacultySchema.pre('save', async function (next) {
  // Check if an academic Faculty with the same title and year already exists
  const isExist = await AcademicFaculty.findOne({
    title: this.title,
  });

  // If the academic Faculty doesn't exist, proceed to the next middleware/handler
  if (!isExist) {
    next();
  } else {
    // If the academic Faculty already exists, throw an ApiError with a status code of 409 (Conflict) and an error message
    throw new ApiError(
      httpStatus.CONFLICT,
      'Academic Faculty is already exist!'
    );
  }
});

export const AcademicFaculty = model<AcademicFacultyType, AcademicFacultyModel>(
  'AcademicFaculty',
  academicFacultySchema
);
