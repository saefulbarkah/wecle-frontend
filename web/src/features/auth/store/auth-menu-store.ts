import { create } from 'zustand';

interface State {
  menu: 'LOGIN' | 'REGISTER';
}

interface Action {
  setMenu: (val: State['menu']) => void;
}

export const useMenuAuth = create<State & Action>((set) => ({
  menu: 'LOGIN',
  setMenu: (val) => set({ menu: val }),
}));
