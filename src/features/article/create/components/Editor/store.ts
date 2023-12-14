import { create } from 'zustand';

type State = {
  focus: {
    title?: boolean;
    content?: boolean;
  };
};

type Action = {
  setFocus: (val: State['focus']) => void;
};

export const useEditorStore = create<State & Action>((set) => ({
  focus: {
    title: true,
    content: false,
  },
  setFocus: (data) =>
    set((state) => ({
      focus: { ...state.focus, ...data },
    })),
}));
