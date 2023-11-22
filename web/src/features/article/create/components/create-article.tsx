'use client';

import React from 'react';
import NavbarArticle from './navbar/navbar-article';

export const CreateArticle = () => {
  return (
    <>
      <NavbarArticle />
      <div className="h-screen overflow-y-auto">
        <div className="container"></div>
      </div>
    </>
  );
};
