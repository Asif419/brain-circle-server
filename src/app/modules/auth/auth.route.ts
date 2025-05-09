import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authValidation } from './auth.validation';
import { authControllers } from './auth.controller';

const router = express.Router();

router.post(
  '/register',
  validateRequest(authValidation.userRegistrationValidationSchema),
  authControllers.createUser,
);

router.post(
  '/login',
  validateRequest(authValidation.userLoginValidationSchema),
  authControllers.loginByUser,
);

export const authRoutes = router;
