'use client';
import React from 'react';
import { createPortal as Portal } from 'react-dom';

type portalProps = React.PropsWithChildren & {
  container?: 'body' | 'head';
};

export const CreatePortal = ({ children, container = 'body' }: portalProps) => {
  const [isMounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return isMounted ? Portal(<>{children}</>, document[container]) : null;
};
