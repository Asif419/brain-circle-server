import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post(
  '/register',
  validateRequest(AuthValidation.userRegistrationValidationSchema),
  AuthController.createUser,
);

router.post(
  '/login',
  validateRequest(AuthValidation.userLoginValidationSchema),
  AuthController.loginByUser,
);

router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthController.refreshToken,
);

export const AuthRoutes = router;
