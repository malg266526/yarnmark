import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { Spacings } from '../styles/spacings';
import { IconWrapper, IconWrapper2 } from './FunnyButton';

export interface ImageButtonProps {
  icon: React.ReactNode;
  children?: React.ReactNode;
  photo?: string;
  text?: ReactNode;
  active?: boolean;
  onClick?: () => void;
}

const activeCss = css`
  border: 2px solid black;
  box-shadow: 1px 1px 5px 1px #555;
`;

const ImageButtonLayout = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  padding: ${Spacings.xs};
  padding-right: ${Spacings.sm};
  border: 2px solid transparent;
  border-radius: 10px;
  box-shadow: 0px black;
  cursor: pointer;

  transition: all 300ms cubic-bezier(0.72, 2.04, 0.68, 0.87);

  &:hover {
    ${activeCss};
  }

  ${({ active }) => active && activeCss};
`;

export const ImageButton = ({ icon, children, ...rest }: ImageButtonProps) => (
  <ImageButtonLayout {...rest}>
    <IconWrapper2>
      <IconWrapper>{icon}</IconWrapper>
    </IconWrapper2>
    {children}
  </ImageButtonLayout>
);
