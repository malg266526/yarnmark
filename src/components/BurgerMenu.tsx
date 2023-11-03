import React from 'react';
import styled from 'styled-components';
import { Colors } from '../styles/theme';

const gapSize = 4;
const lineSize = 4;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${gapSize}px;
  padding: 4px;
  border-radius: 2px;
  cursor: pointer;
  transition: background 150ms ease-in-out;

  &.active {
    background: rgba(0, 0, 0, 0.2);

    > :first-child {
      opacity: 0;
    }

    > :nth-child(2) {
      transform-origin: right;
      transform: translate(-3px, ${gapSize + lineSize}px) rotate(45deg);
    }

    > :last-child {
      transform-origin: left;
      transform: translate(4px, 0) rotate(-45deg);
    }
  }
`;

const Line = styled.span`
  width: 100%;
  height: ${lineSize}px;
  transition: all 150ms ease-in-out;
  background: ${Colors.white};
  opacity: 1;
  width: 24px;
`;

export const BurgerMenu = styled(
  ({ onClick, active, className }: { onClick?: () => void; active: boolean; className?: string }) => (
    <Root onClick={onClick} className={active ? `${className} active` : className}>
      <Line />
      <Line />
      <Line />
    </Root>
  )
)``;
