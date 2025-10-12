import React from "react";
import styled, { css } from "styled-components";
import knittingSvgUrl from "../assets/images/skein3.svg";
import { RedesignSpacings } from "../styles/spacings";
import { Colors } from "../styles/theme";
import { ScreenSize } from "../styles/screeen-size";

type FrameWidth = `${number}${"px" | "%"}`;

const backgroundOffset = 20;

const Root = styled.div`
  position: relative;
  z-index: 1;
  max-width: 100%;

  &:before {
    content: "";
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

  @media (max-width: ${ScreenSize.phone}) {
    max-width: 90%;
    padding: 0;
  }
`;

const Frame = styled.div<{
  width?: FrameWidth;
  height?: FrameWidth;
  padding: keyof typeof RedesignSpacings;
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
  background: white;
  position: relative;
  z-index: 1;
  box-shadow: -10px 13px 0 0 rgba(0, 0, 0, 0.5);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:before {
    pointer-events: none;
    content: "";
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
  padding: keyof typeof RedesignSpacings;
  id?: string;
}

export const FramedBox = ({ children, ...rest }: FramedBoxProps) => (
  <OuterRoot>
    <Root>
      <Frame {...rest}>{children}</Frame>
    </Root>
  </OuterRoot>
);
