import express from 'express';
import { AcademicSemesterValidation } from './academicSemester.validation';
import validateRequest from '../../middleware/validateRequest';
import { academicSemesterController } from './academicSemester.controller';
const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(
    AcademicSemesterValidation.createAcademicSemesterValidationZodSchema
  ),
  academicSemesterController.createSemester
);

export const AcademicSemesterRoutes = router;
