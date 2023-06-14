import express from 'express';
import { FacultyController } from './faculty.controller';
import { FacultyValidation } from './faculty.validation';
import validateRequest from '../../middleware/validateRequest';

// import validateRequest from '../../middleware/validateRequest';
const router = express.Router();

router.get('/:id', FacultyController.getSingleFaculty);

router.delete('/:id', FacultyController.deleteSingleFaculty);

router.patch(
  '/:id',
  validateRequest(FacultyValidation.updateFacultyZodSchema),
  FacultyController.updateFaculty
);

router.get('/', FacultyController.getAllFaculties);

export const FacultyRoutes = router;
