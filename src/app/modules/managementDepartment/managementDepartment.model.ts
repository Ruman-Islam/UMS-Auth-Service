import { Schema, model } from 'mongoose';
import {
  ManagementDepartmentModel,
  ManagementDepartmentType,
} from './managementDepartment.interface';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const ManagementDepartmentSchema = new Schema<
  ManagementDepartmentType,
  ManagementDepartmentModel
>(
  {
    title: {
      type: String,
      required: [true, 'title is missing'],
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

ManagementDepartmentSchema.pre('save', async function (next) {
  const isExist = await ManagementDepartment.findOne({
    title: this.title,
  });

  if (!isExist) {
    next();
  } else {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Management Department is already exist!'
    );
  }
});

export const ManagementDepartment = model<
  ManagementDepartmentType,
  ManagementDepartmentModel
>('ManagementDepartment', ManagementDepartmentSchema);
