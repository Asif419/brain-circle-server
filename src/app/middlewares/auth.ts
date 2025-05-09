import config from '../config';
import AppError from '../error/AppError';
import { TUserRole } from '../modules/user/user.interface';
import catchAsync from '../utils/cathAsync';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../modules/user/user.model';

const auth = (...requiredRules: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    // if token not given
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    const decodedToken = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { userEmail, userRole } = decodedToken;

    // if user doesn't exist
    const isUserExists = await User.userExistenceCheckingByEmail(userEmail);
    if (!isUserExists) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'The user is not found');
    }

    // if user blocked
    const userBlockedStatus = isUserExists.isBlocked;
    if (userBlockedStatus) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'This user is blocked');
    }

    // if user is not holding particular role
    const userRoleInDB = isUserExists.role;
    if (requiredRules && !requiredRules.includes(userRoleInDB)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    req.user = decodedToken as JwtPayload;
    next();
  });
};

export default auth;
