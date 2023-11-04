import { Response, Request } from 'express';
import { z } from 'zod';
import zodErrorHandling from '../../lib/zod-error-handling.js';
import bcrypt from 'bcrypt';
import User from '../../models/user.js';
import Author from '../../models/author.js';
import { createToken } from '../../lib/jwt.js';

type Tuser = {
  name: string;
  email: string;
  password: string;
  avatar?: string;
};

const userSchema = z
  .object({
    name: z.string({ required_error: 'Name is required' }),
    email: z
      .string({ required_error: 'Password is required' })
      .email({ message: 'Must be email' }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, { message: 'Password minium 6 character' }),
  })
  .required({
    name: true,
    password: true,
    email: true,
  });

const signUp = async (req: Request, res: Response) => {
  const { email, password, name, avatar } = req.body as Tuser;
  try {
    userSchema.parse({ email, name, password });

    // check if email already use
    const user = await User.findOne({ email });
    if (user) throw Error('email is already use');

    // hash password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hashPassword = await bcrypt.hash(password, salt);

    // check avatar value
    let newAvatar;
    if (avatar) {
      newAvatar = avatar;
    } else {
      newAvatar = 'is new';
    }

    // create new user
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashPassword,
      avatar: newAvatar,
    });

    // create new author
    await Author.create({
      name: newUser.name,
      user: newUser._id,
    });

    // create token
    const token = createToken(newUser._id);

    res.send({ user: newUser.email, token });
  } catch (error) {
    zodErrorHandling(error, res);
  }
};

export default signUp;