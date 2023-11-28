import React from 'react';
import styled from "styled-components";
import { rgba } from 'polished'
import { Spacings } from '../styles/spacings';
import { Colors } from '../styles/theme';

const Image = styled.img`
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;

  object-fit: contain;
`;

type FrameWidth = `${number}${'px' | '%'}`;

const Root = styled.div`
  position: relative;
  z-index: 1;

  &:after {
    content: '';
    position: absolute;
    left: -20px;
    top: 20px;
    height: calc(100% + 7px);
    width: calc(100% + 7px);
    z-index: 0;
    background: linear-gradient(45deg, ${Colors.yellow} 0%, rgb(251, 241, 210) 50%); 
    /* background: ${rgba(Colors.goldLight, 1)}; */
    /* box-shadow: 3px 3px 3px 3px ${rgba(Colors.goldLight, 0.8)}; */
  }
`;

const Frame = styled.div<{ width: FrameWidth }>`
  width: ${({ width }) => width}; 
  padding: ${Spacings.md} ${Spacings.md} ${Spacings.lg};
  background: white;
  position: relative;
  z-index: 1;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.5);
`;

export interface PhotoBoxProps {
  width: FrameWidth;
  src: string;
}

export const PhotoBox = ({ src, width }: PhotoBoxProps) => (
  <Root>
    <Frame width={width} >
      <Image src={src} />
    </Frame>
  </Root>
);
