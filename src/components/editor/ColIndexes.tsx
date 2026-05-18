import React from 'react';
import styled from 'styled-components';

const size = 16;

const ColIndexesContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Indicator = styled.div`
  min-width: ${size}px;
  min-height: ${size}px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  background: #eee;
  border-bottom: 1px solid #bbb;
  box-sizing: border-box;
  margin-right: 1px;
`;

interface ColIndexesProps {
  cols: number;
}

export const ColIndexes = ({ cols }: ColIndexesProps) => {
  return (
    <ColIndexesContainer>
      {Array.from({ length: cols }, (_, i) => (
        <Indicator key={i}>{i % 2 === 0 ? i / 2 : ''}</Indicator>
      ))}
    </ColIndexesContainer>
  );
};
