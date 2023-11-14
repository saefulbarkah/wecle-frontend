import { Request, Response } from 'express';
import User from '../../models/user.js';
import {
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from '../../errors/index.js';
import errorHandling from '../../lib/error-handling.js';
import jwt from 'jsonwebtoken';
import { ApiResponse } from '../../types/index.js';

export default async function verifyUser(req: Request, res: Response) {
  try {
    // get token
    const { token } = req.body;
    if (!token) throw new UnauthorizedError('Invalid token');

    // decoding token
    const decode = jwt.verify(token, process.env.SECRET_JWT as string);
    const { id } = decode as { id: string };

    // get user
    const isUser = await User.findOne({ _id: id });
    if (!isUser) throw new ValidationError('Unathorization');

    const response: ApiResponse = {
      status: 200,
      message: 'Opration success',
      response: 'success',
      data: decode,
    };
    res.status(response.status).json(response);
  } catch (error) {
    errorHandling(error as Error, res);
  }
}
