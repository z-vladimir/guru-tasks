import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';

import { RootProvider } from './providers/RootProvider';

import './globals.css';

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Guru Tasks',
  description: 'A task management application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.className} antialiased bg-primary-400 text-primary-900`}
      >
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
