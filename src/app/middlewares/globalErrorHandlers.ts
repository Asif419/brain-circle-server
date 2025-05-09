import { ErrorRequestHandler } from 'express';
import httpStatus from 'http-status';
import { TErrorSources } from '../interface/error';
import { ZodError } from 'zod';
import handleZodError from '../error/handleZodError';
import handleValidationError from '../error/handleValidationError';
import handleCastError from '../error/handleCastError';
import handleDuplicateError from '../error/handleDuplicateError';
import AppError from '../error/AppError';

const globalErrorHandlers: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = httpStatus.INTERNAL_SERVER_ERROR as number;
  let message = 'Something went wrong';
  let error: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];
  let stack: string | null | undefined = '';

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = simplifiedError?.error;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = simplifiedError?.error;
    stack = simplifiedError?.stack ? simplifiedError?.stack : null;
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = simplifiedError?.error;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = simplifiedError?.error;
    stack = simplifiedError?.stack ? simplifiedError?.stack : null;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    error = [
      {
        path: '',
        message: err?.message,
      },
    ];
    stack = err?.stack;
  } else if (err instanceof Error) {
    message = err?.message;
    error = [
      {
        path: '',
        message: err?.message,
      },
    ];
    stack = err?.stack;
  }

  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    error,
    stack: stack,
  });
};

export default globalErrorHandlers;
