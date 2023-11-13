import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ApiResponse } from '../../types/index.js';

const Me = async (req: Request, res: Response) => {
  if (!req.cookies.auth) return res.json(null);
  const decode = jwt.verify(req.cookies.auth, process.env.SECRET_JWT as string);
  const response: ApiResponse = {
    status: 200,
    message: 'Opration success',
    response: 'success',
    data: decode,
  };
  res.status(response.status).json(response);
};

export default Me;
