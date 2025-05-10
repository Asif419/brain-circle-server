import express from 'express'
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import authorizeSelfOnly from '../../middlewares/authorizeSelfOnly';

const router = express.Router();

router.get('/:id', authorizeSelfOnly(), UserController.getSingleUserById);
router.patch('/:id',
    authorizeSelfOnly(),
    validateRequest(UserValidation.userUpdateValidationSchema),
    UserController.updateUser,
);
router.patch('/:id/activate', authorizeSelfOnly(), UserController.activateUser);
router.patch('/:id/deactivate', authorizeSelfOnly(), UserController.deactivateUser);


export const UserRoutes = router;