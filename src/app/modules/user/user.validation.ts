import { z } from 'zod';

// ZOD is an extra layer of validation

// Defining a Zod schema for validating user creation request data
const createUserZodSchema = z.object({
  body: z.object({
    role: z.string({
      required_error: 'role is required',
    }),
    password: z.string().optional(),
  }),
});

// Export the validation schema as part of the UserValidation object
export const UserValidation = {
  createUserZodSchema,
};
