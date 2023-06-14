import { Model, Types } from 'mongoose';
import { AcademicSemesterType } from '../academicSemester/academicSemester.interface';
import { AcademicDepartmentType } from '../academicDepartment/academicDepartment.interface';
import { AcademicFacultyType } from '../academicFaculty/academicFaculty.interface';

export type UserNameType = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type StudentGuardianType = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  address: string;
};

export type StudentLocalGuardianType = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type StudentType = {
  id: string;
  name: UserNameType;
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  guardian: StudentGuardianType;
  localGuardian: StudentLocalGuardianType;
  academicSemester: Types.ObjectId | AcademicSemesterType; // reference _id
  academicDepartment: Types.ObjectId | AcademicDepartmentType; // reference _id
  academicFaculty: Types.ObjectId | AcademicFacultyType; // reference _id
  profileImage?: string;
};

export type StudentModel = Model<StudentType, Record<string, unknown>>;

export type StudentFilterType = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
};
