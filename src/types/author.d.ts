import { TDate } from "./global";
import { User } from "./user";

type follow = TDate & {
  _id: string;
  author: Omit<author, "followers" | "followings" | "about" | "user">;
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
