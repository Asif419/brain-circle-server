import express from 'express'
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';
import { userController } from './user.controller';

const router = express.Router();


export const userRoutes = router;