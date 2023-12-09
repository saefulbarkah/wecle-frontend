import { author } from '.';
import { TDate } from './global';

export type User = TDate & {
  _id: string;
  author: Partial<author>;
  email: string;
  password?: string;
};
