// providers.js (app directory)
'use client';

import { Provider } from 'jotai';

export default function AtomProviders({ children }: React.PropsWithChildren) {
  return <Provider>{children}</Provider>;
}
