import { Model, Types } from 'mongoose';
import { AcademicFacultyType } from '../academicFaculty/academicFaculty.interface';

export type AcademicDepartmentType = {
  title: string;
  academicFaculty: Types.ObjectId | AcademicFacultyType;
};

export type AcademicDepartmentModel = Model<
  AcademicDepartmentType,
  Record<string, unknown>
>;

export type AcademicDepartmentFilterType = {
  searchTerm?: string;
  academicFaculty?: Types.ObjectId;
};
