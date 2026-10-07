import styled from 'styled-components';
import { RedesignSpacings } from '../../styles/spacings';

export const Panel = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.xs};
  width: 100%;
  box-sizing: border-box;
  padding: ${RedesignSpacings.sm};
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
`;

const SUMMARY_LINE_HEIGHT_PX = 20;

export const SummaryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  line-height: ${SUMMARY_LINE_HEIGHT_PX}px;
  font-variant-numeric: tabular-nums;
`;

export const HeaderCell = styled.th<{ numeric?: boolean }>`
  padding: 4px 8px;
  border-bottom: 1px solid #d1d5db;
  color: #6b7280;
  font-size: 0.75rem;
  font-weight: 700;
  text-align: ${({ numeric }) => (numeric ? 'right' : 'left')};
  white-space: nowrap;
`;

export const BodyCell = styled.td<{ numeric?: boolean; muted?: boolean }>`
  padding: 4px 8px;
  text-align: ${({ numeric }) => (numeric ? 'right' : 'left')};
  color: ${({ muted }) => (muted ? '#6b7280' : '#111827')};
  white-space: nowrap;
`;

export const TotalRow = styled.tr`
  font-weight: 700;

  & > td {
    border-top: 1px solid #d1d5db;
  }
`;

export const PanelNote = styled.p`
  margin: 0;
  font-size: 0.875rem;
`;

const PRICE_INPUT_WIDTH_PX = 88;
const PRICE_INPUT_HEIGHT_PX = 24;

export const PriceInput = styled.input`
  width: ${PRICE_INPUT_WIDTH_PX}px;
  height: ${PRICE_INPUT_HEIGHT_PX}px;
  box-sizing: border-box;
  padding: 0 6px;
  border: 1px solid #bbb;
  border-radius: 4px;
  background: #fff;
  font: inherit;
  text-align: right;
  font-variant-numeric: tabular-nums;

  &:focus-visible {
    outline: 2px solid #2563eb;
    outline-offset: 1px;
  }
`;
