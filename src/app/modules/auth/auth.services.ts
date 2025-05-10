import config from '../../config';
import AppError from '../../error/AppError';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import httpStatus from 'http-status';
import { createToken } from './auth.utils';
import jwt, { JwtPayload } from 'jsonwebtoken';

const registerUserIntoDB = async (payload: TUser) => {
  const userData: Partial<TUser> = payload;
  const email = userData.email as string;

  const isUserExists = await User.userExistenceCheckingByEmail(email);
  if (isUserExists) {
    throw new AppError(httpStatus.FORBIDDEN, 'Already have an account');
  }

  const newUser = await User.create(payload);
  return newUser;
};

const userLogIn = async (payload: TLoginUser) => {
  const isUserExists = await User.userExistenceCheckingByEmail(payload.email);
  if (!isUserExists) {
    throw new AppError(httpStatus.FORBIDDEN, 'Invalid credentials');
  }
  if (isUserExists?.isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'Invalid credentials');
  }
  if (
    !(await User.isPasswordMatched(payload.password, isUserExists.password))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'Invalid credentials');
  }

  const jwtPayload = {
    userId: isUserExists._id,
    userEmail: isUserExists.email,
    userRole: isUserExists.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );
  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { userEmail, iat } = decoded;
  console.log(decoded)

  const isUserExists = await User.userExistenceCheckingByEmail(userEmail);
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
  }

  // check if the user is already deleted
  const isDeleted = isUserExists?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is already deleted');
  }

  // // check if the user is blocked
  const isBlocked = isUserExists?.isBlocked
  if (isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is Blocked');
  }

  // // checking password changing time and JWT created time
  if (
    isUserExists.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(
      isUserExists?.passwordChangedAt,
      iat as number,
    )
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }

  const jwtPayload = {
    userId: isUserExists?._id,
    userEmail: isUserExists?.email,
    userRole: isUserExists.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return { accessToken };
};

export const AuthService = {
  registerUserIntoDB,
  userLogIn,
  refreshToken,
};
