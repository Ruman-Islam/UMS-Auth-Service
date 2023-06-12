import {
  AcademicSemesterCodeType,
  AcademicSemesterMonthType,
  AcademicSemesterTitleType,
} from './academicSemester.interface';

// The code defines three arrays:
// Each array is typed using the corresponding interface to ensure type safety and consistency when working with academic semesters.

// Array of academic semester months
// AcademicSemesterMonthType: Represents the type for academic semester months.
// academicSemesterMonths: Contains the names of the academic semester months from January to December.

export const academicSemesterMonths: AcademicSemesterMonthType[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// Array of academic semester titles
// AcademicSemesterTitleType: Represents the type for academic semester titles.
// AcademicSemesterTitleType: Contains the titles of the academic semesters, such as Autumn, Summer, and Fall.
export const academicSemesterTitles: AcademicSemesterTitleType[] = [
  'Autumn',
  'Summer',
  'Fall',
];

// Array of academic semester codes
// AcademicSemesterCodeType: Represents the type for academic semester codes.
// academicSemesterCodes: Contains the codes for the academic semesters, represented as strings '01', '02', and '03'.
export const academicSemesterCodes: AcademicSemesterCodeType[] = [
  '01',
  '02',
  '03',
];

// Object mapping to specify corresponding code for semester title
export const academicSemesterTitleCodeMapper: {
  [key: string]: string;
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

// Pre defined searchable fields for academic semester collection
export const academicSemesterSearchableFields = [
  'searchTerm',
  'title',
  'code',
  'year',
];
