import { Request, Response } from 'express';
import errorHandling from '../../lib/error-handling.js';
import { ApiResponse } from '../../types/index.js';

const signOut = async (req: Request, res: Response) => {
  try {
    res.clearCookie('auth');
    const response: ApiResponse = {
      status: 200,
      message: 'Logout successfuly',
      response: 'success',
    };
    res.status(response.status).json(response);
  } catch (error) {
    errorHandling(error as Error, res);
  }
};

export default signOut;
