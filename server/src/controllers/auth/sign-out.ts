import { Request, Response } from 'express';
import errorHandling from '../../lib/error-handling.js';

const signOut = async (req: Request, res: Response) => {
  try {
    res.clearCookie('auth');
    res.send('Logout successfully');
  } catch (error) {
    errorHandling(error as Error, res);
  }
};

export default signOut;
