import { RequestHandler } from 'express';
import catchAsync from '../../utils/cathAsync';
import { AuthService } from './auth.services';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import config from '../../config';

const createUser: RequestHandler = catchAsync(async (req, res) => {
  console.log(req.body)
  const result = await AuthService.registerUserIntoDB(req.body);

  sendResponse(res, {
    success: true,
    message: 'User registration successful',
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

const loginByUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await AuthService.userLogIn(req.body);
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
      accessToken: accessToken,
    },
  });
});

const refreshToken: RequestHandler = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Token created successfully',
    data: result,
  })
})

export const AuthController = {
  createUser,
  loginByUser,
  refreshToken,
};
