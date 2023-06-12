import { z } from 'zod';
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from './academicSemester.constant';

// ZOD is an extra layer of validation

// Defining the Zod schema for validating the request's body object when creating an academic semester
const createAcademicSemesterValidationZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemesterTitles] as [string, ...string[]], {
      required_error: 'Title is required', // Error message for missing title
    }),
    year: z.string({
      required_error: 'Year is required', // Error message for missing year
    }),
    code: z.enum([...academicSemesterCodes] as [string, ...string[]], {
      required_error: 'Code is required', // Error message for missing code
    }),
    startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'Start month is required', // Error message for missing start month
    }),
    endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'End month is required', // Error message for missing end month
    }),
  }),
});

// Defining the Zod schema for validating the request's body object when updating an academic semester
// Ensure: Either give title and code both or give other updated property except these both
const updateAcademicSemesterValidationZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...academicSemesterTitles] as [string, ...string[]])
        .optional(),
      year: z.string().optional(),
      code: z
        .enum([...academicSemesterCodes] as [string, ...string[]])
        .optional(),
      startMonth: z
        .enum([...academicSemesterMonths] as [string, ...string[]])
        .optional(),
      endMonth: z
        .enum([...academicSemesterMonths] as [string, ...string[]])
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'Either both title and code should be provided or neither',
    }
  );

// Export the validation schema as part of the AcademicSemesterValidation object
export const AcademicSemesterValidation = {
  createAcademicSemesterValidationZodSchema,
  updateAcademicSemesterValidationZodSchema,
};
