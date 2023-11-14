import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ApiResponse } from '../../types/index.js';
import { UnauthorizedError, ValidationError } from '../../errors/index.js';
import errorHandling from '../../lib/error-handling.js';
import User from '../../models/user.js';

const Me = async (req: Request, res: Response) => {
  try {
    if (!req.cookies.auth) throw new UnauthorizedError('Required token');
    const decode = jwt.verify(
      req.cookies.auth,
      process.env.SECRET_JWT as string
    );
    const { id } = decode as { id: string };
    const user = User.findOne({ _id: id });
    if (!user) throw new ValidationError('Invalid Token');

    const response: ApiResponse = {
      status: 200,
      message: 'Opration success',
      response: 'success',
      data: user,
    };

    res.status(response.status).json(response);
  } catch (error) {
    errorHandling(error as Error, res);
  }
};

export default Me;
