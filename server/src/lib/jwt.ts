import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export const createToken = (_id: mongoose.Types.ObjectId) => {
  return jwt.sign({ _id }, process.env.SECRET_JWT as string, {
    expiresIn: '3d',
  });
};
