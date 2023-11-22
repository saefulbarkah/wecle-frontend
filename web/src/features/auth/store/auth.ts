import { SessionType } from '@/hooks/sessions/type';
import { create } from 'zustand';

interface State {
  token: string | null;
  session: SessionType;
}

interface Action {
  setToken: (val: State['token']) => void;
  setSession: (val: State['session']) => void;
}

export const useAuth = create<State & Action>((set) => ({
  session: null,
  token: null,
  setToken: (val) => set({ token: val }),
  setSession: (val) => set({ session: val }),
}));
