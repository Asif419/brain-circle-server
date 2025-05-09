/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '../config';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';
import httpStatus from 'http-status';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);

  const extractedMessage = match && match[1];

  const error: TErrorSources = [
    {
      path: '',
      message: `${extractedMessage} is already exists`,
    },
  ];
  const statusCode = httpStatus.BAD_REQUEST;

  return {
    success: false,
    message: 'Duplication Error',
    statusCode,
    error,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  };
};

export default handleDuplicateError;
