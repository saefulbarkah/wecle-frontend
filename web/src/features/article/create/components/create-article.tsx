'use client';

import React from 'react';
import { Editor } from './Editor';

export const CreateArticle = () => {
  return (
    <>
      <div className="h-[calc(100vh-60px)] overflow-y-auto">
        <div className="container max-w-5xl">
          <Editor />
        </div>
      </div>
    </>
  );
};
