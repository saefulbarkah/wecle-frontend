import { findCommentType } from '@/types';
import { create } from 'zustand';

type State = {
  comments: findCommentType[];
};

type Action = {
  addComment: (value: findCommentType) => void;
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
