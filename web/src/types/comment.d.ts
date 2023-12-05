import { authorType } from './author';
import { TDate } from './global';

export type commentType = TDate & {
  _id: string;
  author: authorType;
  text: string;
};
