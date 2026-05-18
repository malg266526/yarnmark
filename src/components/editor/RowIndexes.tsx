import React from 'react';
import styled from 'styled-components';
import { GAP_PX, SQUARE_PX, SQUARE_SIZE_M } from './utils/hallGeometry';

const RowIndexesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${GAP_PX}px;
  width: 100%;
  position: relative;
`;

const Indicator = styled.div`
  width: 100%;
  height: ${SQUARE_PX}px;
  flex: 0 0 ${SQUARE_PX}px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 4px;
  font-size: 12px;
  line-height: 1;
  font-weight: bold;
  background: #eee;
  border-right: 1px solid #bbb;
  box-sizing: border-box;
`;

const EdgeIndicator = styled.div`
  position: absolute;
  right: 0;
  bottom: -${SQUARE_PX / 2}px;
  padding-right: 4px;
  font-size: 12px;
  line-height: 1;
  font-weight: bold;
  color: #555;
  pointer-events: none;
`;

interface RowIndexesProps {
  rows: number;
}

export const RowIndexes = ({ rows }: RowIndexesProps) => {
  const labels = Array.from({ length: rows }, (_, i) => (i * SQUARE_SIZE_M).toFixed(1));
  const edgeLabel = (rows * SQUARE_SIZE_M).toFixed(1);

  return (
    <RowIndexesContainer>
      {labels.map((label, index) => (
        <Indicator key={index} data-row-label={index}>
          {label}
        </Indicator>
      ))}
      <EdgeIndicator data-row-label={rows}>{edgeLabel}</EdgeIndicator>
    </RowIndexesContainer>
  );
};
