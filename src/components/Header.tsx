import styled from 'styled-components';
import { Spacings } from '../styles/spacings';
import { Colors, Theme } from '../styles/theme';
import React, { ReactNode } from 'react';

const FullWidthHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;

  padding: ${Spacings.xs} ${Spacings.lg};
  border-bottom: 1px solid ${Colors.pinball};

  background-color: white;

  box-shadow:
    0 2px 2px 0 rgba(0, 0, 0, 0.2),
    0 2px 5px 0 rgba(0, 0, 0, 0.19);
`;

const CenteredHeader = styled.div`
  width: ${Theme.headerWidth};
  display: flex;
  flex-direction: row;
  align-self: center;
  align-items: center;
  justify-content: center;
`;

export interface HeaderProps {
  children?: ReactNode;
}

export const Header = ({ children }: HeaderProps) => (
  <FullWidthHeader>
    <CenteredHeader>{children}</CenteredHeader>
  </FullWidthHeader>
);
