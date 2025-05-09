import { RequestHandler } from 'express';
import catchAsync from '../../utils/cathAsync';
import { authServices } from './auth.services';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import config from '../../config';

const createUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await authServices.registerUserIntoDB(req.body);

  sendResponse(res, {
    success: true,
    message: 'User registration successful',
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

const loginByUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await authServices.userLogIn(req.body);
  const { refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV == 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    success: true,
    message: 'Login successful',
    statusCode: httpStatus.OK,
    data: {
      token: accessToken,
    },
  });
});

export const authControllers = {
  createUser,
  loginByUser,
};
