'use client';

import { PropsWithChildren } from 'react';
import { HeroUIProvider } from '@heroui/react';

import { ReactQueryProvider } from './ReactQueryProvider';

export const RootProvider = ({ children }: PropsWithChildren) => {
  return (
    <HeroUIProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </HeroUIProvider>
  );
};
