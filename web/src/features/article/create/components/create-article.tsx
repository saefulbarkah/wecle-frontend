'use client';

import React from 'react';
import { Editor } from './Editor';

export const CreateArticle = () => {
  return (
    <>
      <div className="h-screen overflow-y-auto">
        <div className="container max-w-5xl mt-[4rem]">
          <Editor />
        </div>
      </div>
    </>
  );
};
