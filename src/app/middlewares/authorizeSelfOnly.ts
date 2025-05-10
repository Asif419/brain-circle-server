import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/user/user.model';
import catchAsync from '../utils/cathAsync';
import AppError from '../error/AppError';

const authorizeSelfOnly = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // check token has been send or not
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { userId, iat } = decoded;
    const paramId = req.params.id;
    
    //checking-1: user is not owner of the data
    if(paramId != userId) {
        throw new AppError(httpStatus.NOT_FOUND, 'You are not authorized to access');
    }

    //checking-2: user exist or not
    const isUserExists = await User.userExistenceCheckingByID(userId);
    if (!isUserExists) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
    }

    //checking-3: if the user is already deleted
    const isDeleted = isUserExists.isDeleted;
    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is already deleted');
    }

    //checking-4: if the user is suspended
    const userStatus = isUserExists?.status;
    if (userStatus === 'suspended') {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is Suspended');
    }

    //checking-5: password changing time and JWT created time
    if (
      isUserExists.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChanged(
        userId.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    // decoded undefined
    req.user = decoded as JwtPayload;
    next();
  });
};

export default authorizeSelfOnly;
