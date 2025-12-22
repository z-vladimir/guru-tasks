'use client';
import { PropsWithChildren } from 'react';

import { ReactQueryProvider } from './ReactQueryProvider';

export const RootProvider = ({ children }: PropsWithChildren) => {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
};
