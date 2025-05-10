import express from 'express'
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.get('/:id', auth(USER_ROLE.user), UserController.getSingleUserById);

export const UserRoutes = router;