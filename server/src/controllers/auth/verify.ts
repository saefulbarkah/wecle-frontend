import { Request, Response } from 'express';
import User from '../../models/user.js';
import { ValidationError } from '../../errors/index.js';
import errorHandling from '../../lib/error-handling.js';
import jwt from 'jsonwebtoken';

export default async function verifyUser(req: Request, res: Response) {
  const { token } = req.body;
  if (!token) return res.json(null);
  try {
    const decode = jwt.verify(token, process.env.SECRET_JWT as string);
    const { id } = decode as { id: string };
    const isUser = await User.findOne({ _id: id });
    if (!isUser) return new ValidationError('Unathorization');
    res.json(decode);
  } catch (error) {
    errorHandling(error as Error, res);
  }
}
