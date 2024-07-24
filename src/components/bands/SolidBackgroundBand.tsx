import React, { ReactNode } from 'react';
import { Spacings } from '../../styles/spacings';
import { Align, BandRootLayout, BandSize, Justify } from './BandRootLayout';
import styled from 'styled-components';

interface BackgroundBand {
  id?: string;
  children?: ReactNode;
  padding?: keyof typeof Spacings;
  size?: BandSize;
  justify?: Justify;
  align?: Align;
  direction?: 'column' | 'row';
  color: string;
  maxWidth?: `${number}%` | `${number}px`;
}

const BackgroundWrapper = styled.div<{ color: string }>`
  display: flex;
  flex: 1;
  width: 100%;
  background: ${({ color }) => color};
`;

export const SolidBackgroundBand = ({ id, children, direction, color, ...styles }: BackgroundBand) => {
  return (
    <BackgroundWrapper color={color}>
      <BandRootLayout id={id} direction={direction} {...styles}>
        {children}
      </BandRootLayout>
    </BackgroundWrapper>
  );
};
