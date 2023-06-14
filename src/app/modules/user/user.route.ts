import express from 'express';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import validateRequest from '../../middleware/validateRequest';
const router = express.Router();

router.post(
  '/create-student',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createStudent
);

router.post(
  '/create-faculty',
  validateRequest(UserValidation.createFacultyZodSchema),
  UserController.createFaculty
);

/**
 * Get a single user information from user collection
 */
router.get('/:id', UserController.getSingleUser);

/**
 * Route for getting all the users information.
 * It will retrieve all the data by Pagination
 * and calls the getAllUsers controller method from UserController.
 */
router.get('/', UserController.getAllUsers);

export const UserRoutes = router;
