import { create } from 'zustand';

interface State {
  token: string | null;
}

interface Action {
  setToken: (val: State['token']) => void;
}

export const useAuth = create<State & Action>((set) => ({
  token: null,
  setToken: (val) => set({ token: val }),
}));
