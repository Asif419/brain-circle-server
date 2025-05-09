import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';
import httpStatus from 'http-status';
import config from '../config';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const error: TErrorSources = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];
  const statusCode = httpStatus.BAD_REQUEST;

  return {
    success: false,
    message: 'Invalid ID',
    statusCode,
    error,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  };
};

export default handleCastError;
