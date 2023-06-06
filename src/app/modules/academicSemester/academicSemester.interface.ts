import { Model } from 'mongoose';

// Represents the type for academic semester months
export type IAcademicSemesterMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

// Represents the type for academic semester titles
export type IAcademicSemesterTitle = 'Autumn' | 'Summer' | 'Fall';

// Represents the type for academic semester codes
export type IAcademicSemesterCode = '01' | '02' | '03';

// Represents the structure of an academic semester
export type IAcademicSemester = {
  title: IAcademicSemesterTitle; // Title of the academic semester
  year: number; // Year of the academic semester
  code: IAcademicSemesterCode; // Code of the academic semester
  startMonth: IAcademicSemesterMonth; // Start month of the academic semester
  endMonth: IAcademicSemesterMonth; // End month of the academic semester
};

// Represents the Mongoose model for academic semesters
export type AcademicSemesterModel = Model<IAcademicSemester>;
