import { author } from '.';
import { TDate } from './global';
import { User } from './user';

type user = Pick<User, '_id' | 'createdAt' | 'updatedAt'> & {
  author: Pick<author, '_id' | 'avatar' | 'createdAt' | 'name' | 'updatedAt'>;
};

export type Notification = TDate & {
  _id: string;
  sender: user;
  receiver: user;
  message: string;
  targetUrl: string;
  readAt: date | null;
};
