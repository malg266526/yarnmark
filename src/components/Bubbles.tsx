import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Colors } from '../styles/theme';

type BubbleProps = {
  top?: `${number}px`;
  left?: `${number}px`;
  right?: `${number}px`;
  bottom?: `${number}px`;
  width: `${number}px`;
  color?: string;
  content?: ReactNode;
};

const Bubble = styled.div<BubbleProps>`
  width: ${({ width }) => width};
  height: ${({ width }) => width};

  top: ${({ top }) => top};
  right: ${({ right }) => right};
  left: ${({ left }) => left};
  bottom: ${({ bottom }) => bottom};

  position: absolute;
  background-color: ${({ color }) => color || Colors.beige1};

  border-radius: 100%;
  z-index: 15;
  overflow: hidden;
`;

type BubblesProps = {
  coordinates: BubbleProps[];
};

export const Bubbles = ({ coordinates }: BubblesProps) => {
  return coordinates.map((coordinate: BubbleProps, index) => (
    <Bubble key={index} {...coordinate}>
      {coordinate.content}
    </Bubble>
  ));
};
