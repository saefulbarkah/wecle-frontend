import { Response, Request } from 'express';
import bcrypt from 'bcrypt';
import User from '../../models/user.js';
import { createToken } from '../../lib/jwt.js';
import zodErrorHandling from '../../lib/zod-error-handling.js';
import { z } from 'zod';

type Tuser = {
  email: string;
  password: string;
};

const loginSchema = z
  .object({
    email: z.string({ required_error: 'Email is required' }),
    password: z.string({ required_error: 'Password is required' }),
  })
  .required();

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body as Tuser;

  try {
    // parse schema
    loginSchema.parse({ email, password });

    // check if any user
    const user = await User.findOne({ email: email });
    if (!user) throw Error('Invalid Credentials');

    // validation password
    const validatePassword = bcrypt.compare(password, user.password);
    if (!validatePassword) throw Error('Email or password incorrect');

    // create token
    const token = createToken(user._id);
    res.send({ user: user.email, token });
  } catch (error) {
    zodErrorHandling(error, res);
  }
};

export default signIn;
