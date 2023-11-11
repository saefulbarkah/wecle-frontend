import { Request, Response } from 'express';
import User from '../../models/user.js';
import { ValidationError } from '../../errors/index.js';
import errorHandling from '../../lib/error-handling.js';

export default async function verifyUser(req: Request, res: Response) {
  const { id } = req.body;
  try {
    const isUser = await User.findOne({ _id: id });
    if (!isUser) return new ValidationError('Unathorization');
    res.send('success');
  } catch (error) {
    errorHandling(error as Error, res);
  }
}
