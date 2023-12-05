import { commentType } from '@/types';
import { create } from 'zustand';

type State = {
  comments: commentType[];
};

type Action = {
  addComment: (value: commentType) => void;
};

export const useComment = create<Action & State>((set) => ({
  comments: [],
  addComment: (value) => {
    return set((state) => ({
      comments: [
        {
          ...value,
        },
        ...state.comments,
      ],
    }));
  },
}));
