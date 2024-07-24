import { Typography } from '../Typography';
import React, { ReactNode } from 'react';
import { usePhone } from '../../hooks/usePhone';
import { CenteredParagraph } from '../CenteredParagraph';

// TODO - compound component??

interface BandTitleProps {
  children?: ReactNode;
}

export const BandTitle = ({ children }: BandTitleProps) => {
  const isPhone = usePhone();

  if (isPhone) {
    return (
      <CenteredParagraph>
        <Typography size="xl" weight="bold">
          {children}
        </Typography>
      </CenteredParagraph>
    );
  }

  return (
    <Typography size="xxl" weight="bold">
      {children}
    </Typography>
  );
};
