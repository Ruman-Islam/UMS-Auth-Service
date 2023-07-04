import { RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AuthService } from './auth.services';
import { LoginUserResponseType, RefreshTokenResponse } from './auth.interface';
import config from '../../../config';

const loginUser: RequestHandler = catchAsync(async (req, res) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);
  const { refreshToken, ...others } = result;

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  return sendResponse<LoginUserResponseType>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    meta: null,
    data: others,
  });
});

const changePassword: RequestHandler = catchAsync(async (req, res) => {
  const user = req.user;
  const { ...passwordData } = req.body;

  await AuthService.changePassword(user, passwordData);

  return sendResponse<LoginUserResponseType>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password change successfully',
    meta: null,
    data: null,
  });
});

const refreshToken: RequestHandler = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  return sendResponse<RefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Refresh token successfully',
    meta: null,
    data: result,
  });
});

export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
};

// login --> default password --> change password --> need password change --> true | false --> true --> false
