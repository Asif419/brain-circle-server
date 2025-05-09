import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { adminController } from './admin.controller';

const router = express.Router();
router.patch(
  '/users/:userId/:status',
  auth(USER_ROLE.admin),
  adminController.blockUser,
);

router.delete('/blogs/:id', auth(USER_ROLE.admin), adminController.deleteBlog);

export const adminRoutes = router;
