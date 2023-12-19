export type SessionType = {
  id: string;
  name?: string;
  email?: string;
  avatar?: string;
  token: string;
  author_id?: string;
} | null;
