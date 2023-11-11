import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const Me = async (req: Request, res: Response) => {
  if (!req.cookies.auth) return res.json(null);
  const decode = jwt.verify(req.cookies.auth, process.env.SECRET_JWT as string);
  res.status(200).json(decode);
};

export default Me;
