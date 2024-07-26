import React, { useCallback, useRef } from 'react';
import styled, { css } from 'styled-components';
import { DropShadow, Radius } from '../styles/cards';
import { RedesignSpacings, Spacings } from '../styles/spacings';
import { ScreenSize } from '../styles/screeen-size';

export interface TabRootProps {
  active?: boolean;
}

const TabRoot = styled.div<{ active?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${Spacings.md};
  padding: ${Spacings.sm};
  cursor: pointer;

  border-radius: 4px;

  border-top: 2px solid transparent;
  border-left: 2px solid transparent;
  border-right: 2px solid transparent;

  border-top-left-radius: 8px;
  border-top-right-radius: 8px;

  &:hover {
    border-color: black;

    @media (max-width: ${ScreenSize.phone}) {
      border-color: transparent;
      border-bottom: 2px solid darkgray;
    }
  }

  ${({ active }) =>
    active &&
    css`
      background: white;
      border-bottom: 2px solid darkgray;
    `};
`;

export type TabProps = React.HTMLProps<HTMLDivElement> &
  TabRootProps & {
    onClick?: () => void;
  };

const Tab = ({ onClick, ...rest }: TabProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const proxyOnClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(e);
    },
    [onClick]
  );

  return <TabRoot {...rest} ref={ref} onClick={proxyOnClick} />;
};

const Content = styled.div`
  background: white;
  padding-top: ${RedesignSpacings.sm};
  width: 100%;
  flex: 1 1 auto;
  border-radius: ${Radius.lg};
  box-shadow: ${DropShadow.md};

  @media (max-width: ${ScreenSize.phone}) {
    border-radius: 0;
    box-shadow: none;
  }
`;

export const Tabs = Object.assign(
  styled.div`
    width: 100%;
    display: flex;
    gap: 2px;

    overflow: auto;
  `,
  {
    Tab,
    Content
  }
);
