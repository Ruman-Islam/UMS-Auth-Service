import express from 'express';
import { StudentController } from './student.controller';
import { StudentValidation } from './student.validation';
import validateRequest from '../../middleware/validateRequest';
const router = express.Router();

router.get('/:id', StudentController.getSingleStudent);

router.delete('/:id', StudentController.deleteSingleStudent);

router.patch(
  '/:id',
  validateRequest(StudentValidation.updateStudentZodSchema),
  StudentController.updateStudent
);

router.get('/', StudentController.getAllStudents);

export const StudentRoutes = router;
