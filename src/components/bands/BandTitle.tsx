import { Typography } from '../Typography';
import React, { ReactNode } from 'react';
import { usePhone } from '../../hooks/usePhone';
import { BackgroundColors, TextColors } from '../../styles/theme';
import styled from 'styled-components';
import { ScreenSize } from '../../styles/screeen-size';
import { RedesignSpacings } from '../../styles/spacings';

interface BandTitleProps {
  children?: ReactNode;
}

const CenteredTypography = styled(Typography)`
  text-align: center;
`;

export const BandTitle = ({ children }: BandTitleProps) => {
  const isPhone = usePhone();

  if (isPhone) {
    return (
      <CenteredTypography size="lg" weight="bold">
        {children}
      </CenteredTypography>
    );
  }

  return (
    <Typography size="xl" weight="bold">
      {children}
    </Typography>
  );
};

const SecondaryTitle = styled(Typography)`
  @media (max-width: ${ScreenSize.phone}) {
    color: ${TextColors.accent};
  }
`;

const SecondaryTitleWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  background: ${BackgroundColors.ticketBand};
  padding: ${RedesignSpacings.sm} 0;
`;

export const SecondaryBandTitle = ({ children }: BandTitleProps) => (
  <SecondaryTitleWrapper>
    <SecondaryTitle size="xl" weight="bold">
      {children}
    </SecondaryTitle>
  </SecondaryTitleWrapper>
);
