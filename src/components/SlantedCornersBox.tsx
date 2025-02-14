import React from 'react';
import styled, { css } from 'styled-components';
import { RedesignSpacings } from '../styles/spacings';
import { BrownScale, Colors } from '../styles/theme';
import knittingSvgUrl from '../assets/images/skein3.svg';

import { ScreenSize } from '../styles/screeen-size';
import { DropShadow, Radius } from '../styles/cards';

type FrameWidth = `${number}${'px' | '%'}`;

interface RootProps {
  overflowSize: `${number}${'px' | '%'}`;
  overflowLength: `${number}${'px' | '%'}`;
  marginTop?: keyof typeof RedesignSpacings;
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

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AnimationFrame = styled.div<RootProps>`
  position: relative;
  z-index: 1;
  ${boxShadow};
  ${animationFrames};
  margin-top: ${({ marginTop }) => RedesignSpacings[marginTop || 'none']};

  @media (max-width: ${ScreenSize.phone}) {
    max-width: 100%;
    overflow: hidden;
    box-shadow: none;
  }

  &:before {
    @media (max-width: ${ScreenSize.phone}) {
      display: none;
    }
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
    @media (max-width: ${ScreenSize.phone}) {
      display: none;
    }
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

const PaperCard = styled.div<{
  width?: FrameWidth;
  height?: FrameWidth;
  padding: keyof typeof RedesignSpacings;
  gap?: keyof typeof RedesignSpacings;
}>`
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

  padding: ${({ padding }) => RedesignSpacings[padding]};
  gap: ${({ gap }) => RedesignSpacings[gap || 'none']};

  background: ${BrownScale[50]};
  position: relative;
  z-index: 1;
  box-shadow: ${DropShadow.card};
  border-radius: ${Radius.md};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: ${ScreenSize.phone}) {
    width: 100%;
    box-shadow: none;
  }

  &:before {
    content: '';
    position: absolute;
    top: calc(${({ padding }) => RedesignSpacings[padding === 'none' ? 'md' : padding]} / 2);
    left: calc(${({ padding }) => RedesignSpacings[padding === 'none' ? 'md' : padding]} / 2);
    width: 26px;
    height: 26px;
    background: url(${knittingSvgUrl}) no-repeat center;
    background-size: contain;
  }
`;

export interface SlantingFrameBoxProps extends Partial<RootProps> {
  width?: FrameWidth;
  height?: FrameWidth;
  children?: React.ReactNode;
  padding: keyof typeof RedesignSpacings;
  marginTop?: keyof typeof RedesignSpacings;
  gap?: keyof typeof RedesignSpacings;
}

export const SlantedCornersBox = ({
  children,
  overflowLength = '30%',
  overflowSize = '3px',
  marginTop,
  ...rest
}: SlantingFrameBoxProps) => (
  <Root>
    <AnimationFrame overflowLength={overflowLength} overflowSize={overflowSize} marginTop={marginTop}>
      <PaperCard {...rest}>{children}</PaperCard>
    </AnimationFrame>
  </Root>
);
