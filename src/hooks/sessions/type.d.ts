export type SessionType = {
  id: string;
  name?: string;
  email?: string;
  avatar?: string;
  token?: string | null;
  author_id?: string;
} | null;
