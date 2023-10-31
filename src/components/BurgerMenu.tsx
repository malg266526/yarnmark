import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px;
  border-radius: 2px;
  cursor: pointer;
  transition: background 150ms ease-in-out;

  &.active {
    background: rgba(0, 0, 0, .2);

    > :first-child {
      transform: rotate(-45deg) translate(-6px, 5.5px);
    }

    > :nth-child(2) {
      transform: rotate(-135deg) translate(-0.5px, 0);
    }

    > :last-child {
      opacity: 0;
    }
  }
`;

const Line = styled.span`
  width: 100%;
  height: 4px;
  transition: all 150ms ease-in-out;
  background: black;
  opacity: 1;
  width: 24px;
`;

export const BurgerMenu = ({ onClick, active }: { onClick?: () => void; active: boolean; }) => (
  <Root onClick={onClick} className={active ? "active" : undefined} >
    <Line />
    <Line />
    <Line />
  </Root>
);

