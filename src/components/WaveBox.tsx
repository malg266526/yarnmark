import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Spacings } from '../styles/spacings';
import wave from '../assets/images/wave.svg';

const Root = styled.div<{ wide?: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: ${Spacings.lg};
  padding-bottom: ${({ wide }) => (wide ? Spacings.xxl : Spacings.xl)};
  max-width: ${({ wide }) => (wide ? '25%' : '20%')};
  border-radius: 10%;
  align-items: flex-end;
  background: url(${wave}) no-repeat bottom white;
  gap: ${Spacings.sm};
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.5);
`;

type WaveBoxType = {
  children?: ReactNode;
  wide?: boolean;
};

export const WaveBox = ({ children, wide }: WaveBoxType) => <Root wide={wide}>{children}</Root>;
