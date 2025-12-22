'use client';
import { PropsWithChildren } from 'react';

import { ReactQueryProvider } from './ReactQueryProvider';

export function RootProvider({ children }: PropsWithChildren) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
