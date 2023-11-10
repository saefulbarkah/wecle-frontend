import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const Me = async (req: Request, res: Response) => {
  const token = req.cookies.auth;
  if (!token) return res.json(null);
  const decode = jwt.verify(token, process.env.SECRET_JWT as string);
  res.status(200).json(decode);
};

export default Me;
