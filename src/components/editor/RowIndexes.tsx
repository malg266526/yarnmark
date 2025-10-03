import React from "react";
import styled from "styled-components";

const size = 16;

const RowIndexesContainer = styled.div`
  display: flex;
  flex-direction: column;
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
  border-right: 1px solid #bbb;
  box-sizing: border-box;
  margin-bottom: 1px;
`;

interface RowIndexesProps {
  rows: number;
}

export const RowIndexes = ({ rows }: RowIndexesProps) => (
  <RowIndexesContainer>
    {Array.from({ length: rows }).map((_, row) => (
      <Indicator key={`row-indicator-${row}`}>{row}</Indicator>
    ))}
  </RowIndexesContainer>
);
