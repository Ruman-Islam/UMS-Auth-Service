import express from 'express';
import { AdminController } from './admin.controller';
import { AdminValidation } from './admin.validation';
import validateRequest from '../../middleware/validateRequest';

// import validateRequest from '../../middleware/validateRequest';
const router = express.Router();

router.get('/:id', AdminController.getSingleAdmin);

router.patch(
  '/:id',
  validateRequest(AdminValidation.updateAdminZodSchema),
  AdminController.updateAdmin
);

router.delete('/:id', AdminController.deleteSingleAdmin);

router.get('/', AdminController.getAllAdmins);

export const AdminRoutes = router;
