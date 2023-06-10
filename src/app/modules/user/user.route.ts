import express from 'express';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import validateRequest from '../../middleware/validateRequest';
const router = express.Router();

/**
UserRoutes is an Express Router that defines the routes related to user management.
It maps the '/create-user' route to the POST HTTP method and associates it with the 'createUser' method in the UserController.
Before invoking the 'createUser' method, the request body is validated using the 'createUserZodSchema' schema from the UserValidation module.
The 'validateRequest' middleware is used to perform the validation.
This code ensures that when a POST request is made to '/create-user', the request body is validated according to the specified schema before being handled by the 'createUser' method in the UserController.
*/
router.post(
  '/create-user',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);

/**
 * Route for getting all the users information.
 * It will retrieve all the data by Pagination
 * and calls the getAllUsers controller method from UserController.
 */
router.get('/get-all-users', UserController.getAllUsers);

export const UserRoutes = router;
