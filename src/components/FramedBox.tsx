import React from 'react';
import styled, { css } from 'styled-components';
import { rgba } from 'polished';
import { Spacings } from '../styles/spacings';
import { Colors } from '../styles/theme';
import knittingSvgUrl from '../assets/knitting.svg';

type FrameWidth = `${number}${'px' | '%'}`;

const Root = styled.div`
  position: relative;
  z-index: 1;

  /* &:before {
    content: '';
    position: absolute;
    left: -10px;
    top: 10px;
    height: calc(100% + 7px);
    width: calc(100% + 7px);
    z-index: 1;
    background: black;
  } */

  &:after {
    content: '';
    position: absolute;
    left: -20px;
    top: 20px;
    height: calc(100% + 7px);
    width: calc(100% + 7px);
    z-index: 0;
    /* background: black; */
    background: linear-gradient(45deg, ${Colors.green1} 0%, ${Colors.green2} 50%);
    /* box-shadow: 3px 3px 3px 3px ${rgba(Colors.green2, 0.8)}; */
  }
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
    content: '';
    position: absolute;
    top: calc(${({ padding }) => Spacings[padding]} / 2);
    left: calc(${({ padding }) => Spacings[padding]} / 2);
    width: 30px;
    height: 30px;
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
  <Root>
    <Frame {...rest}>{children}</Frame>
  </Root>
);
