import { Model, Types } from 'mongoose';
import { ManagementDepartmentType } from '../managementDepartment/managementDepartment.interface';

export type AdminNameType = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type AdminType = {
  id: string;
  name: AdminNameType;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  gender: 'male' | 'female';
  presentAddress: string;
  permanentAddress: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  managementDepartment: Types.ObjectId | ManagementDepartmentType; // reference _id
  designation:
    | 'Administrator'
    | 'Manager'
    | 'Supervisor'
    | 'Coordinator'
    | 'Director'
    | 'Executive'
    | 'HR executive'
    | 'Officer'
    | 'Assistant'
    | 'Registrar'
    | 'Dean'
    | 'Vice Chancellor'
    | 'Controller of Examinations'
    | 'Finance Officer'
    | 'Librarian'
    | 'Head of Department'
    | 'Program Coordinator'
    | 'Academic Advisor'
    | 'Admissions Officer';
  profileImage?: string;
};

export type AdminModel = Model<AdminType, Record<string, unknown>>;

export type AdminFilterType = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
};
