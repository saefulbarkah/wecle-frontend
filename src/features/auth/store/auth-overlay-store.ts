import { create } from "zustand";

type State = {
  isOpen: boolean;
  menu: "LOGIN" | "REGISTER";
};

type Action = {
  setOpen: (val: boolean) => void;
  setMenu: (val: State["menu"]) => void;
};

export const useAuthOverlay = create<State & Action>((set) => ({
  isOpen: false,
  menu: "LOGIN",
  setOpen: (val) =>
    set({
      isOpen: val,
    }),
  setMenu: (val) => set({ menu: val }),
}));
