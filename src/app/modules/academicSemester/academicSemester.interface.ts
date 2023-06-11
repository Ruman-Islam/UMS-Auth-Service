import { Model } from 'mongoose';

// Represents the type for academic semester months
export type AcademicSemesterMonthType =
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
export type AcademicSemesterTitleType = 'Autumn' | 'Summer' | 'Fall';

// Represents the type for academic semester codes
export type AcademicSemesterCodeType = '01' | '02' | '03';

// Represents the structure of an academic semester
export type AcademicSemesterType = {
  title: AcademicSemesterTitleType; // Title of the academic semester
  year: string; // Year of the academic semester
  code: AcademicSemesterCodeType; // Code of the academic semester
  startMonth: AcademicSemesterMonthType; // Start month of the academic semester
  endMonth: AcademicSemesterMonthType; // End month of the academic semester
};

// Represents the Mongoose model for academic semesters
export type AcademicSemesterModel = Model<AcademicSemesterType>;
