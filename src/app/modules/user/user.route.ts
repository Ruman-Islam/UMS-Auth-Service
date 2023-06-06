import express from 'express';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import validateRequest from '../../middleware/validateRequest';
const router = express.Router();

/**
    This code defines the user routes using Express Router.
    The '/create-user' route is associated with the POST HTTP method and mapped to the 'createUser' method in the UserController.
    Before invoking the 'createUser' method, the request body is validated using the 'createUserZodSchema' schema from the UserValidation module. The 'validateRequest' middleware is used for this purpose.
    The router is exported as 'UserRoutes' for use in other parts of the application.
    This code ensures that when a POST request is made to '/create-user', the request body is validated according to the specified schema before being handled by   the 'createUser' method in the UserController.
 */
router.post(
  '/create-user',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);

export const UserRoutes = router;
