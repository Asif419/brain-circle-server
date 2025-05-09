import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';
import httpStatus from 'http-status';

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
    stack: err?.stack,
  };
};

export default handleCastError;
