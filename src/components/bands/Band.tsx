import React from 'react';
import { BandRootLayout, BandSize } from './BandRootLayout';
import { BandTitle } from './BandTitle';

interface BandProps {
  children?: React.ReactNode;
  size?: BandSize;
  id: string;
}

export const Band = Object.assign(({ children }: BandProps) => <BandRootLayout>{children}</BandRootLayout>, {
  Title: BandTitle
});

// Band.displayName = 'Band';
