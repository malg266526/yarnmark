import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { RowIndexes } from './RowIndexes';
import { StandInfo } from './StandInfo';
import { StandForm } from './StandForm';
import { useEditor } from './EditorContext';
import { useMouseHandlers } from './utils/useMouseHandlers';
import { RedesignSpacings } from '../../styles/spacings';
import { StandColorsMap } from './StandProps';
import { isWithinBox } from './utils/isWithinBox';
import { CtaButton } from '../Button';
import { saveHallToFile } from './utils/saveHallToFile';
import { StandList } from './StandList';
import { ColIndexes } from './ColIndexes';
import {
  GAP_PX,
  GRID_COLS,
  GRID_ROWS,
  HALL_HEIGHT_M,
  HALL_WIDTH_M,
  SQUARE_PX,
  gridHeightPx,
  gridWidthPx
} from './utils/hallGeometry';

const rulerWidthPx = 48;

const EditorContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${RedesignSpacings.md};
  flex-wrap: wrap;
`;

const StandDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${RedesignSpacings.md};
`;

const GridSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.sm};
  min-width: 0;
`;

const HallSizeInfo = styled.div`
  font-weight: 700;
`;

const GridScroller = styled.div`
  max-width: 100%;
  overflow-x: auto;
  overflow-y: visible;
`;

const GridChrome = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
`;

const GridHeader = styled.div`
  display: flex;
  align-items: stretch;
`;

const GridBody = styled.div`
  display: flex;
  align-items: flex-start;
`;

const RulerSpacer = styled.div`
  width: ${rulerWidthPx}px;
  flex: 0 0 ${rulerWidthPx}px;
`;

const ColIndexesArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const RowIndexesArea = styled.div`
  width: ${rulerWidthPx}px;
  flex: 0 0 ${rulerWidthPx}px;
`;

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${GAP_PX}px;
  background: #ccc;
`;

const GridRow = styled.div`
  display: flex;
  flex: 0 0 ${SQUARE_PX}px;
  gap: ${GAP_PX}px;
  height: ${SQUARE_PX}px;
  line-height: 1;
`;

const GridFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  font-weight: 700;
`;

const Square = styled.div<{
  background: string;
  isInsideStand?: boolean;
}>`
  width: ${SQUARE_PX}px;
  height: ${SQUARE_PX}px;
  flex: 0 0 ${SQUARE_PX}px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  user-select: none;
  font-size: 0.8rem;
  line-height: 1;
  background: ${({ background }) => background};
  border: ${({ isInsideStand }) => (isInsideStand ? '1px solid #f0f0f0' : '1px solid #bbb')};
  transition: background 0.1s ease;
  position: relative;
`;

const StandIndex = styled.div`
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  font-size: 24px; /* adjust if needed */
  color: #111;
  pointer-events: none; /* allow clicks to pass through */
  user-select: none;
  white-space: nowrap;
`;

const StandVendor = styled.div`
  position: absolute;
  z-index: 2;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  font-size: 14px; /* adjust if needed */
  color: #111;
  pointer-events: none; /* allow clicks to pass through */
  user-select: none;
  white-space: nowrap;
`;

export const Editor = () => {
  const { start, end, handleMouseDown, handleMouseEnter, handleMouseUp, handleClick } = useMouseHandlers();

  const { stands, currentStand } = useEditor();
  const gridContainerRef = useRef<HTMLDivElement | null>(null);
  const rowIndexesRef = useRef<HTMLDivElement | null>(null);

  const getStandAtCell = (row: number, col: number) => {
    return stands.find((stand) => isWithinBox(row, col, stand.start, stand.end)) || null;
  };

  const isSelected = (row: number, col: number) => isWithinBox(row, col, start, end);

  useEffect(() => {
    const gridElement = gridContainerRef.current;
    const rowIndexesElement = rowIndexesRef.current;

    if (!gridElement || !rowIndexesElement) {
      return;
    }

    const gridRect = gridElement.getBoundingClientRect();
    const rowRect = rowIndexesElement.getBoundingClientRect();
    const verticalDelta = Math.round(rowRect.height - gridRect.height);

    if (verticalDelta !== 0) {
      console.warn('[EditorGridDebug] row labels and grid have different heights', {
        gridHeight: Math.round(gridRect.height),
        rowLabelsHeight: Math.round(rowRect.height),
        deltaPx: verticalDelta,
        expectedGridHeight: gridHeightPx
      });
    }
  }, [stands, currentStand, start, end]);

  return (
    <EditorContainer>
      <GridSection>
        <HallSizeInfo>
          Hall size: {HALL_WIDTH_M}m × {HALL_HEIGHT_M}m ({GRID_COLS} × {GRID_ROWS} squares)
        </HallSizeInfo>
        <GridScroller>
          <>
            <GridChrome>
              <GridHeader>
                <RulerSpacer />
                <ColIndexesArea>
                  <ColIndexes cols={GRID_COLS} />
                </ColIndexesArea>
              </GridHeader>
              <GridBody>
                <RowIndexesArea ref={rowIndexesRef}>
                  <RowIndexes rows={GRID_ROWS} />
                </RowIndexesArea>
                <GridContainer
                  ref={gridContainerRef}
                  style={{
                    width: `${gridWidthPx}px`,
                    height: `${gridHeightPx}px`,
                    minWidth: `${gridWidthPx}px`,
                    minHeight: `${gridHeightPx}px`
                  }}
                >
                  {Array.from({ length: GRID_ROWS }, (_, row) => (
                    <GridRow key={`row-${row}`} data-grid-row={row}>
                      {Array.from({ length: GRID_COLS }, (_, col) => {
                        const stand = getStandAtCell(row, col);
                        const background = stand
                          ? StandColorsMap[stand.color || 'taken']
                          : isSelected(row, col)
                            ? '#90ee90'
                            : '#fff';

                        const hasCoords = stand?.start && stand?.end;

                        const isMiddle =
                          hasCoords &&
                          row === Math.floor((stand.start!.row + stand.end!.row) / 2) &&
                          col === Math.floor((stand.start!.col + stand.end!.col) / 2);

                        const isInsideStand = !!stand;

                        return (
                          <Square
                            key={`${row}-${col}`}
                            data-grid-cell
                            data-row={row}
                            data-col={col}
                            background={background}
                            isInsideStand={isInsideStand}
                            onMouseDown={() => handleMouseDown(row, col)}
                            onMouseEnter={() => handleMouseEnter(row, col)}
                            onMouseUp={handleMouseUp}
                            onClick={() => handleClick(row, col, currentStand.width ?? 1, currentStand.height ?? 1)}
                          >
                            {isMiddle && stand ? (
                              <StandIndex>
                                {stand.index}
                                <StandVendor>{stand.vendor}</StandVendor>
                              </StandIndex>
                            ) : (
                              ''
                            )}
                          </Square>
                        );
                      })}
                    </GridRow>
                  ))}
                </GridContainer>
              </GridBody>
            </GridChrome>
            <GridFooter>
              {HALL_WIDTH_M}m width, {HALL_HEIGHT_M}m height
            </GridFooter>
          </>
        </GridScroller>
      </GridSection>
      <StandDetailsContainer>
        <StandInfo start={start} end={end} />
        <StandForm start={start} end={end} />

        <CtaButton type="submit" onClick={() => saveHallToFile(stands)}>
          Generate JSON
        </CtaButton>
        <StandList />
      </StandDetailsContainer>
    </EditorContainer>
  );
};
