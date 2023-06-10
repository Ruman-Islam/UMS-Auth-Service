import express from 'express';
import { AcademicSemesterValidation } from './academicSemester.validation';
import validateRequest from '../../middleware/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';

const router = express.Router();

/**
 * Route for creating an academic semester.
 * It applies validation to the request body using the Zod schema from AcademicSemesterValidation,
 * and calls the createSemester controller method from AcademicSemesterController.
 */
router.post(
  '/create-semester',
  validateRequest(
    AcademicSemesterValidation.createAcademicSemesterValidationZodSchema
  ),
  AcademicSemesterController.createSemester
);

/**
 * Route for getting all the academic semester information.
 * It will retrieve all the data by Pagination
 * and calls the getAllSemesters controller method from AcademicSemesterController.
 */
router.get('/get-all-semesters', AcademicSemesterController.getAllSemesters);

/**
 * Export the router for academic semester routes.
 */
export const AcademicSemesterRoutes = router;
