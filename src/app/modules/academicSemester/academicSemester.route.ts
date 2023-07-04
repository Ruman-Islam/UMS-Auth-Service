import express from 'express';
import { AcademicSemesterValidation } from './academicSemester.validation';
import validateRequest from '../../middleware/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import auth from '../../middleware/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

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
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicSemesterController.createSemester
);

/**
 * Get a single semester information from academic semester collection
 */
router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  AcademicSemesterController.getSingleSemester
);

/**
 * Update a single semester information from academic semester collection
 */
router.patch(
  '/:id',
  validateRequest(
    AcademicSemesterValidation.updateAcademicSemesterValidationZodSchema
  ),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicSemesterController.updateSemester
);

/**
 * delete a single semester information from academic semester collection
 */
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicSemesterController.deleteSemester
);

/**
 * Route for getting all the academic semester information.
 * It will retrieve all the data by Pagination
 * and calls the getAllSemesters controller method from AcademicSemesterController.
 */
router.get(
  '/',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  AcademicSemesterController.getAllSemesters
);

export const AcademicSemesterRoutes = router;
