import { Model, Types } from 'mongoose';
import { AcademicDepartmentType } from '../academicDepartment/academicDepartment.interface';
import { AcademicFacultyType } from '../academicFaculty/academicFaculty.interface';

export type FacultyNameType = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type FacultyType = {
  id: string;
  name: FacultyNameType;
  gender: 'male' | 'female';
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  designation:
    | 'Professor'
    | 'Associate Professor'
    | 'Assistant Professor'
    | 'Lecturer'
    | 'Research Professor'
    | 'Visiting Professor'
    | 'Adjunct Professor'
    | 'Emeritus Professor'
    | 'Research Associate'
    | 'Postdoctoral Fellow'
    | 'Instructor'
    | 'Teaching Assistant';
  academicDepartment: Types.ObjectId | AcademicDepartmentType; // reference _id
  academicFaculty: Types.ObjectId | AcademicFacultyType; // reference _id
  profileImage?: string;
};

export type FacultyModel = Model<FacultyType, Record<string, unknown>>;

export type FacultyFilterType = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
};
