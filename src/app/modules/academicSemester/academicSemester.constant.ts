import {
  IAcademicSemesterCode,
  IAcademicSemesterMonth,
  IAcademicSemesterTitle,
} from './academicSemester.interface';

// The code defines three arrays:
// Each array is typed using the corresponding interface to ensure type safety and consistency when working with academic semesters.

// Array of academic semester months
// IAcademicSemesterMonth: Represents the type for academic semester months.
// academicSemesterMonths: Contains the names of the academic semester months from January to December.

export const academicSemesterMonths: IAcademicSemesterMonth[] = [
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
// IAcademicSemesterTitle: Represents the type for academic semester titles.
// academicSemesterTitles: Contains the titles of the academic semesters, such as Autumn, Summer, and Fall.
export const academicSemesterTitles: IAcademicSemesterTitle[] = [
  'Autumn',
  'Summer',
  'Fall',
];

// Array of academic semester codes
// IAcademicSemesterCode: Represents the type for academic semester codes.
// academicSemesterCodes: Contains the codes for the academic semesters, represented as strings '01', '02', and '03'.
export const academicSemesterCodes: IAcademicSemesterCode[] = [
  '01',
  '02',
  '03',
];
