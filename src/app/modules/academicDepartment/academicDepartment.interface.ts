import { Model, Types } from 'mongoose';
import { AcademicFacultyType } from '../academicFaculty/academicFaculty.interface';

export type AcademicDepartmentType = {
  title: string;
  academicFaculty: Types.ObjectId | AcademicFacultyType;
};

export type AcademicDepartmentModel = Model<AcademicDepartmentType>;

export type AcademicDepartmentFilterRequest = {
  searchTerm?: string;
  academicFaculty?: Types.ObjectId;
};
