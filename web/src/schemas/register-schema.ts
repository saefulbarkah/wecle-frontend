import { z } from 'zod';
import { loginSchema } from './login-schema';

const registerSchema = loginSchema
  .extend({
    name: z.string({ required_error: 'Name is required' }),
  })
  .required();

type registerType = z.infer<typeof registerSchema>;

export { registerSchema, type registerType };
