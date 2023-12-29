import { create } from "zustand";

type State = {
  status: "pending" | "success" | "writing" | "error" | null;
  focus: {
    title?: boolean;
    content?: boolean;
  };
};

type Action = {
  setFocus: (val: State["focus"]) => void;
  setStatus: (val: State["status"]) => void;
};

export const useEditorStore = create<State & Action>((set) => ({
  focus: {
    title: true,
    content: false,
  },
  status: null,
  setFocus: (data) =>
    set((state) => ({
      focus: { ...state.focus, ...data },
    })),
  setStatus: (value) =>
    set({
      status: value,
    }),
}));
