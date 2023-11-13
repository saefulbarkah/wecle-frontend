import { Response } from 'express';
import { z } from 'zod';
import { NotFoundError, ValidationError } from '../errors/index.js';
import { ApiResponse } from '../types/index.js';

const errorHandling = (error: Error, res: Response) => {
  if (error instanceof z.ZodError) {
    const errorMsg = error.issues.map((item) => {
      return {
        message: item.message,
        field: item.path[0],
      };
    });
    const response: ApiResponse = {
      status: 400,
      response: 'error',
      message: 'Invalid request',
      error: errorMsg,
    };
    res.status(response.status).json(response);
  } else if (error instanceof NotFoundError) {
    const response: ApiResponse = {
      response: 'error',
      status: 404,
      message: error.message,
    };
    res.status(response.status).json(response);
  } else if (error instanceof ValidationError) {
    const response: ApiResponse = {
      response: 'error',
      status: 400,
      message: error.message,
    };
    res.status(response.status).json(response);
  } else {
    const response: ApiResponse = {
      response: 'error',
      status: 500,
      message: 'Internal server error',
    };
    res.status(response.status).json(response);
  }
};

export default errorHandling;
