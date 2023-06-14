import { z } from 'zod';
import { bloodGroup, gender } from '../Student/student.constant';
import { adminDesignation } from '../admin/admin.constant';

// ZOD is an extra layer of validation

// Defining a Zod schema for validating user creation request data

const updateAdminZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string().optional(),
      middleName: z.string().optional(),
      lastName: z.string().optional(),
    }),
    dateOfBirth: z.string().optional(),
    gender: z.enum([...gender] as [string, ...string[]]).optional(),
    bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
    email: z.string().email().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    designation: z
      .enum([...adminDesignation] as [string, ...string[]])
      .optional(),
    managementDepartment: z.string().optional(),
    profileImage: z.string().optional(),
  }),
});

// Export the validation schema as part of the UserValidation object
export const AdminValidation = {
  updateAdminZodSchema,
};
