import React from 'react';
import styled, { css } from 'styled-components';
import { Spacings } from '../styles/spacings';
import { Colors } from '../styles/theme';
import knittingSvgUrl from '../assets/knitting.svg';
import { ScreenSize } from '../styles/screeen-size';

type FrameWidth = `${number}${'px' | '%'}`;

interface RootProps {
  overflowSize: `${number}${'px' | '%'}`;
  overflowLength: `${number}${'px' | '%'}`;
}

const boxShadow = css`
  box-shadow: 1px 1px 5px 1px #333;
`;

const skew = css`
  transform: skew(-0.1rad, -0.1rad);
`;

const animationFrames = css`
  @keyframes background {
    0% {
      background-position: 0 0;
    }

    20% {
      background-position: 100% 100%;
    }

    60% {
      background-position: 100% 100%;
    }

    70% {
      background-position: 0 0;
    }

    100% {
      background-position: 0 0;
    }
  }
`;

const animationCss = css`
  animation: 7s linear infinite alternate running background;
  animation-delay: 3s;
`;

const Root = styled.div<RootProps>`
  position: relative;
  z-index: 1;
  ${boxShadow};
  ${animationFrames};

  &:before {
    content: '';
    position: absolute;
    z-index: 0;
    background: linear-gradient(
      45deg,
      ${Colors.red1} 0%,
      ${Colors.red1} 45%,
      white 50%,
      white 55%,
      ${Colors.red1} 60%,
      ${Colors.red1} 100%
    );
    background-size: 400%;
    ${skew};
    ${boxShadow};

    ${({ overflowSize, overflowLength }) => css`
      top: -${overflowSize};
      left: calc(100% - ${overflowLength} + ${overflowSize});
      height: ${overflowLength};
      width: ${overflowLength};
    `};

    ${animationCss};
  }

  &:after {
    content: '';
    position: absolute;
    z-index: 0;
    background: linear-gradient(
      45deg,
      ${Colors.red1} 0%,
      ${Colors.red1} 30%,
      white 50%,
      white 55%,
      ${Colors.red1} 60%,
      ${Colors.red1} 100%
    );
    background-size: 400%;
    ${skew};
    ${boxShadow};

    ${({ overflowSize, overflowLength }) => css`
      top: calc(100% - ${overflowLength} + ${overflowSize});
      left: -${overflowSize};
      height: ${overflowLength};
      width: ${overflowLength};
    `};

    ${animationCss};
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

  @media (max-width: ${ScreenSize.phone}) {
    width: 100%;
  }

  padding: ${({ padding }) => Spacings[padding]};
  background: white;
  position: relative;
  z-index: 1;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.5);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:before {
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

export interface NiceBoxProps extends Partial<RootProps> {
  width?: FrameWidth;
  height?: FrameWidth;
  children?: React.ReactNode;
  padding: keyof typeof Spacings;
}

export const NiceBox = ({ children, overflowLength = '30%', overflowSize = '3px', ...rest }: NiceBoxProps) => (
  <Root overflowLength={overflowLength} overflowSize={overflowSize}>
    <Frame {...rest}>{children}</Frame>
  </Root>
);
