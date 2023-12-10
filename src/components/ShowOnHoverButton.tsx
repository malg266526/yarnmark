import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { ImageButton } from './ImageButton';
import { Colors } from '../styles/theme';
import { Spacings } from '../styles/spacings';

export interface ShowOnHoverButtonProps {
  icon: React.ReactNode;
  text?: React.ReactNode;
  onClick?: () => void;
  children?: ReactNode;
}

const TextWrapper = styled.div`
  pointer-events: none;
  position: absolute;
  top: -50%;
  right: 0;
  transform-origin: center;
  transition: all 300ms cubic-bezier(0.72, 2.04, 0.68, 0.87);
  background: ${Colors.grayLight};
  border-radius: 4px;
  box-shadow: 1px 1px 3px 0px black;
  min-width: 300px;
  min-height: 200px;
  padding: ${Spacings.lg};

  opacity: 0;
  transform: scale(0.5);
`;

const Root = styled.div`
  position: relative;

  &:hover ${TextWrapper} {
    transform: scale(1);
    opacity: 1;
    z-index: 100;
  }
`;

export const ShowOnHoverButton = ({ icon, onClick, children, text }: ShowOnHoverButtonProps) => (
  <Root onClick={onClick}>
    <ImageButton icon={icon}>{children}</ImageButton>

    {text && <TextWrapper>{text}</TextWrapper>}
  </Root>
);
