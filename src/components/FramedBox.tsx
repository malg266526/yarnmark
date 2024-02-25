import React from 'react';
import styled, { css } from 'styled-components';
import { rgba } from 'polished';
import { Spacings } from '../styles/spacings';
import { Colors } from '../styles/theme';
import knittingSvgUrl from '../assets/images/skein3.svg';

type FrameWidth = `${number}${'px' | '%'}`;

const backgroundOffset = 20;

const Root = styled.div`
  position: relative;
  z-index: 1;
  max-width: 100%;

  &:before {
    content: '';
    position: absolute;
    left: -${backgroundOffset}px;
    top: ${backgroundOffset}px;
    height: calc(100% + 7px);
    width: calc(100% + 7px);
    z-index: 0;
    background: black;
    background: linear-gradient(15deg, #a48a78 0%, ${Colors.beige1} 40%);
  }
`;

const OuterRoot = styled.div`
  max-width: 100%;
  padding-left: ${backgroundOffset};
  padding-bottom: ${backgroundOffset};
`;

const Frame = styled.div<{ width?: FrameWidth; height?: FrameWidth; padding: keyof typeof Spacings }>`
  ${({ width }) =>
    width &&
    css`
      width: ${width};
    `};
  ${({ height }) =>
    height &&
    css`
      height: ${height};
    `};
  padding: ${({ padding }) => Spacings[padding]};
  background: white;
  position: relative;
  z-index: 1;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.5);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  :before {
    pointer-events: none;
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    width: 26px;
    height: 26px;
    background: url(${knittingSvgUrl}) no-repeat center;
    background-size: contain;
  }
`;

export interface FramedBoxProps {
  width?: FrameWidth;
  height?: FrameWidth;
  children?: React.ReactNode;
  padding: keyof typeof Spacings;
}

export const FramedBox = ({ children, ...rest }: FramedBoxProps) => (
  <OuterRoot>
    <Root>
      <Frame {...rest}>{children}</Frame>
    </Root>
  </OuterRoot>
);
