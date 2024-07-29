import styled from 'styled-components';
import { RedesignSpacings } from '../styles/spacings';
import React, { ReactNode } from 'react';

export const RoundBorderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid black;
  padding: ${RedesignSpacings.xs};
  border-radius: 50%;
`;

export const Root = styled.div`
  flex-shrink: 0;
  padding: ${RedesignSpacings.xxs};
  padding-right: ${RedesignSpacings.xs};
  border-radius: 50%;
  box-shadow: none;
  transition: all 150ms ease-in-out;
  background: transparent;
  cursor: pointer;
  overflow: hidden;
  position: relative;
`;

interface BorderIconProps {
  children?: ReactNode;
}

export const RoundBorderIcon = ({ children }: BorderIconProps) => (
  <Root>
    <RoundBorderWrapper>{children}</RoundBorderWrapper>
  </Root>
);
