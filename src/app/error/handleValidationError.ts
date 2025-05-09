import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';
import httpStatus from 'http-status';
import config from '../config';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const statusCode = httpStatus.BAD_REQUEST;
  const error: TErrorSources = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );
  return {
    success: false,
    message: 'Validation Error',
    statusCode,
    error,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  };
};

export default handleValidationError;
