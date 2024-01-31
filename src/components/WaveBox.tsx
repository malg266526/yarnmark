import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Spacings } from '../styles/spacings';
import { WaveImage } from './WaveImage';

const Root = styled.div<{ wide?: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: white;
  max-width: ${({ wide }) => (wide ? '25%' : '20%')};
  border-radius: 4px;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.5);
`;

const Content = styled.div<{ wide?: boolean }>`
  display: flex;
  flex-direction: column;
  padding: ${Spacings.lg} ${Spacings.lg} 0 ${Spacings.lg};
  align-items: flex-end;
  gap: ${Spacings.sm};
`;

type WaveBoxType = {
  children?: ReactNode;
  wide?: boolean;
};

export const WaveBox = ({ children, wide }: WaveBoxType) => (
  <Root wide={wide}>
    <Content>{children}</Content>
    <WaveImage />
  </Root>
);
