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
  '/',
  validateRequest(
    AcademicSemesterValidation.createAcademicSemesterValidationZodSchema
  ),
  AcademicSemesterController.createSemester
);

/**
 * Get a single semester information from academic semester collection
 */
router.get('/:id', AcademicSemesterController.getSingleSemester);

/**
 * Update a single semester information from academic semester collection
 */
router.patch(
  '/:id',
  validateRequest(
    AcademicSemesterValidation.updateAcademicSemesterValidationZodSchema
  ),
  AcademicSemesterController.updateSemester
);

/**
 * Route for getting all the academic semester information.
 * It will retrieve all the data by Pagination
 * and calls the getAllSemesters controller method from AcademicSemesterController.
 */
router.get('/', AcademicSemesterController.getAllSemesters);

export const AcademicSemesterRoutes = router;
