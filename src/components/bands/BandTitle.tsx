import { Typography } from '../Typography';
import React, { ReactNode } from 'react';

// TODO - compound component??

interface BandTitleProps {
  children?: ReactNode;
}

export const BandTitle = ({ children }: BandTitleProps) => (
  <Typography size="xxl" weight="bold">
    {children}
  </Typography>
);
