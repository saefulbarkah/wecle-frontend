import { z } from 'zod';

const loginSchema = z
  .object({
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Field must be email' }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(5, { message: 'Password minimum 5 character' }),
  })
  .required({
    email: true,
    password: true,
  });

type loginType = z.infer<typeof loginSchema>;

export { loginSchema, type loginType };
