import { z } from 'zod';

const createFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required', // Error message for missing title
    }),
  }),
});

const updateFacultyZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
  }),
});

// Export the validation schema as part of the AcademicFacultyValidation object
export const AcademicFacultyValidation = {
  createFacultyZodSchema,
  updateFacultyZodSchema,
};
