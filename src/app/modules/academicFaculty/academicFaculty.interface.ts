import { Model } from 'mongoose';

export type AcademicFacultyType = {
  title: string;
};

export type AcademicFacultyModel = Model<AcademicFacultyType>;
