import React from 'react';
import styled from 'styled-components';
import { GAP_PX, SQUARE_PX, SQUARE_SIZE_M } from './utils/hallGeometry';

const ColIndexesContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${GAP_PX}px;
  width: fit-content;
  position: relative;
`;

const Indicator = styled.div`
  width: ${SQUARE_PX}px;
  height: ${SQUARE_PX}px;
  flex: 0 0 ${SQUARE_PX}px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  line-height: 1;
  font-weight: bold;
  background: #eee;
  border-bottom: 1px solid #bbb;
  box-sizing: border-box;
`;

const EdgeIndicator = styled.div`
  position: absolute;
  bottom: 0;
  right: -${SQUARE_PX / 2}px;
  font-size: 12px;
  line-height: 1;
  font-weight: bold;
  color: #555;
  pointer-events: none;
`;

interface ColIndexesProps {
  cols: number;
}

export const ColIndexes = ({ cols }: ColIndexesProps) => {
  return (
    <ColIndexesContainer>
      {Array.from({ length: cols }, (_, i) => (
        <Indicator key={i} data-col-label={i}>
          {i % 2 === 0 ? (i * SQUARE_SIZE_M).toFixed(0) : ''}
        </Indicator>
      ))}
      <EdgeIndicator data-col-label={cols}>{(cols * SQUARE_SIZE_M).toFixed(0)}</EdgeIndicator>
    </ColIndexesContainer>
  );
};
