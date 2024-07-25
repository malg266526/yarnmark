import { Typography } from '../Typography';
import React, { ReactNode } from 'react';
import { usePhone } from '../../hooks/usePhone';
import { CenteredParagraph } from '../CenteredParagraph';
import { BackgroundColors, TextColors } from '../../styles/theme';
import styled from 'styled-components';
import { ScreenSize } from '../../styles/screeen-size';
import { Spacings } from '../../styles/spacings';

const MobileTitle = styled(Typography)`
  @media (max-width: ${ScreenSize.phone}) {
    color: ${TextColors.accent};
  }
`;

const MobileTitleWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  background: ${BackgroundColors.smoothGradient};
  padding: ${Spacings.md} 0;
`;

interface BandTitleProps {
  children?: ReactNode;
}

export const BandTitle = ({ children }: BandTitleProps) => {
  const isPhone = usePhone();

  if (isPhone) {
    return (
      <MobileTitleWrapper>
        <MobileTitle size="xl" weight="bold">
          {children}
        </MobileTitle>
      </MobileTitleWrapper>
    );
  }

  return (
    <Typography size="xxl" weight="bold">
      {children}
    </Typography>
  );
};
