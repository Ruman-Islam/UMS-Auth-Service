import express from 'express';
import { AcademicSemesterValidation } from './academicSemester.validation';
import validateRequest from '../../middleware/validateRequest';
import { academicSemesterController } from './academicSemester.controller';

const router = express.Router();

/**
 * Route for creating an academic semester.
 * It applies validation to the request body using the Zod schema from AcademicSemesterValidation,
 * and calls the createSemester controller method from academicSemesterController.
 */
router.post(
  '/create-semester',
  validateRequest(
    AcademicSemesterValidation.createAcademicSemesterValidationZodSchema
  ),
  academicSemesterController.createSemester
);

/**
 * Export the router for academic semester routes.
 */
export const AcademicSemesterRoutes = router;
