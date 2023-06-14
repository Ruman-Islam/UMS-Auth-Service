import { z } from 'zod';
import { bloodGroup, gender } from '../Student/student.constant';

// ZOD is an extra layer of validation

// Defining a Zod schema for validating user creation request data
const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'first name is required',
        }),
        middleName: z.string().optional(),
        lastName: z.string({
          required_error: 'last name is required',
        }),
      }),
      dateOfBirth: z.string({
        required_error: 'date of birth is required',
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'gender is required',
      }),
      bloodGroup: z
        .enum([...bloodGroup] as [string, ...string[]], {
          required_error: 'blood group is required',
        })
        .optional(),
      email: z
        .string({
          required_error: 'email is required',
        })
        .email(),
      contactNo: z.string({
        required_error: 'contact is required',
      }),
      emergencyContactNo: z.string({
        required_error: 'emergency contact is required',
      }),
      presentAddress: z.string({
        required_error: 'present address is required',
      }),
      permanentAddress: z.string({
        required_error: 'permanent address is required',
      }),
      guardian: z.object({
        fatherName: z.string({
          required_error: 'father name is required',
        }),
        fatherOccupation: z.string({
          required_error: 'father occupation is required',
        }),
        fatherContactNo: z.string({
          required_error: 'father contact is required',
        }),
        motherName: z.string({
          required_error: 'mother name is required',
        }),
        motherOccupation: z.string({
          required_error: 'mother occupation is required',
        }),
        motherContactNo: z.string({
          required_error: 'mother contact is required',
        }),
        address: z.string({
          required_error: 'address is required',
        }),
      }),
      localGuardian: z.object({
        name: z.string({
          required_error: 'local guardian name is required',
        }),
        occupation: z.string({
          required_error: 'local guardian occupation is required',
        }),
        contactNo: z.string({
          required_error: 'local guardian contact is required',
        }),
        address: z.string({
          required_error: 'local guardian address is required',
        }),
      }),
      academicSemester: z.string({
        required_error: 'academic semester is required',
      }),
      academicDepartment: z.string({
        required_error: 'academic department is required',
      }),
      academicFaculty: z.string({
        required_error: 'academic faculty is required',
      }),
      profileImage: z.string().optional(),
    }),
  }),
});

// Export the validation schema as part of the UserValidation object
export const UserValidation = {
  createUserZodSchema,
};
