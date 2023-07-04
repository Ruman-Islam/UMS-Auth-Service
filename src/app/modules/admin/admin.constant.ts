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

export const adminDesignation: string[] = [
  'Administrator',
  'Manager',
  'Supervisor',
  'Coordinator',
  'Director',
  'Executive',
  'HR executive',
  'Officer',
  'Assistant',
  'Registrar',
  'Dean',
  'Vice Chancellor',
  'Controller of Examinations',
  'Finance Officer',
  'Librarian',
  'Head of Department',
  'Program Coordinator',
  'Academic Advisor',
  'Admissions Officer',
  // Add more designations as needed
];

export const adminSearchableFields: string[] = [
  'searchTerm',
  'id',
  'email',
  'contactNo',
  'name.firstName',
  'name.middleName',
  'name.lastName',
  'designation',
];

export const adminFilterableField: string[] = [
  'id',
  'bloodGroup',
  'email',
  'contactNo',
  'emergencyContactNo',
];
