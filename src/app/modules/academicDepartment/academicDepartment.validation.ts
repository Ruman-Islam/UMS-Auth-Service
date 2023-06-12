import { z } from 'zod';

const createDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required', // Error message for missing title
    }),
    academicFaculty: z.string({
      required_error: 'Academic Department is required',
    }),
  }),
});

const updateDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    academicFaculty: z.string().optional(),
  }),
});

// Export the validation schema as part of the AcademicDepartmentValidation object
export const AcademicDepartmentValidation = {
  createDepartmentZodSchema: createDepartmentZodSchema,
  updateDepartmentZodSchema,
};
