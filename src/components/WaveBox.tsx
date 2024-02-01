import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Spacings } from '../styles/spacings';
import shipThemed from '../assets/images/ship-themed.svg';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 500px;
  padding: ${Spacings.lg};
  border-radius: 4px;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.5);
  gap: ${Spacings.md};
  align-items: flex-end;
`;

const Content = styled.div`
  display: flex;
  // width: 800px;
  flex-direction: column;
  align-items: flex-end;
  gap: ${Spacings.sm};
`;

type WaveBoxType = {
  children?: ReactNode;
};

export const WaveBox = ({ children }: WaveBoxType) => (
  <Root>
    <Content>{children}</Content>
    <img
      src={shipThemed}
      width={200}
      style={{
        opacity: 0.5,
        filter: 'grayscale(0.5)'
      }}
    />
  </Root>
);
