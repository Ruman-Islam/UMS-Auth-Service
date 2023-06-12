import { Schema, model } from 'mongoose';
// import httpStatus from 'http-status';
// import ApiError from '../../../errors/ApiError';
import {
  AcademicDepartmentModel,
  AcademicDepartmentType,
} from './academicDepartment.interface';

const AcademicDepartmentSchema = new Schema<AcademicDepartmentType>(
  {
    title: {
      type: String,
      required: [true, 'department title is missing!'],
      unique: true,
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

// // Same year and same department validation
// academicFacultySchema.pre('save', async function (next) {
//   // Check if an academic Faculty with the same title and year already exists
//   const isExist = await AcademicFaculty.findOne({
//     title: this.title,
//   });

//   // If the academic Faculty doesn't exist, proceed to the next middleware/handler
//   if (!isExist) {
//     next();
//   } else {
//     // If the academic Faculty already exists, throw an ApiError with a status code of 409 (Conflict) and an error message
//     throw new ApiError(
//       httpStatus.CONFLICT,
//       'Academic Faculty is already exist!'
//     );
//   }
// });

export const AcademicDepartment = model<
  AcademicDepartmentType,
  AcademicDepartmentModel
>('AcademicDepartment', AcademicDepartmentSchema);
