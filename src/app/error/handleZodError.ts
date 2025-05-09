import { ZodError, ZodIssue } from 'zod';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';
import httpStatus from 'http-status';
import config from '../config';

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const error: TErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const statusCode = httpStatus.BAD_REQUEST;

  return {
    success: false,
    statusCode,
    message: 'Validation error',
    error,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  };
};

export default handleZodError;
