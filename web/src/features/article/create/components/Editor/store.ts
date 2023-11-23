import { Content } from '@tiptap/react';
import { create } from 'zustand';

type State = {
  content: Content;
};

type Action = {
  setContent: (val: State['content']) => void;
};

export const useEditorStore = create<State & Action>((set) => ({
  content: '<h3></h3><br/><p></p>',
  setContent: (val) => set({ content: val }),
}));
