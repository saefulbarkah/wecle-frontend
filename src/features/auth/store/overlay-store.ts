import { create } from 'zustand';

interface State {
  isOpen: boolean;
}
interface Action {
  setOpen: (val: boolean) => void;
}

export const useAuthOverlay = create<State & Action>((set) => ({
  isOpen: false,
  setOpen: (val) => set({ isOpen: val }),
}));
