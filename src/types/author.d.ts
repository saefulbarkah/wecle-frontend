import { TDate } from "./global";
import { User } from "./user";

type follow = TDate & {
  _id: string;
  name: string;
  avatar: string;
};

export type author = TDate & {
  _id: string;
  name: string;
  avatar: string;
  about: string;
  user: Omit<User, "password">;
  followers: follow[];
  followings: follow[];
};
