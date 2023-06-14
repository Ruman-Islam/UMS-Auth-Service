export const gender: string[] = ['male', 'female'];

export const bloodGroup: string[] = [
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
];

export const designation: string[] = [
  'Professor',
  'Associate Professor',
  'Assistant Professor',
  'Lecturer',
  'Research Professor',
  'Visiting Professor',
  'Adjunct Professor',
  'Emeritus Professor',
  'Research Associate',
  'Postdoctoral Fellow',
  'Instructor',
  'Teaching Assistant',
];

export const facultySearchableFields: string[] = [
  'id',
  'email',
  'contactNo',
  'name.firstName',
  'name.middleName',
  'name.lastName',
  'designation',
];

export const facultyFilterableField: string[] = [
  'searchTerm',
  'id',
  'bloodGroup',
  'email',
  'contactNo',
  'emergencyContactNo',
];
