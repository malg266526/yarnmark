import React from "react";
import styled from "styled-components";
import { RowIndexes } from "./RowIndexes";
import { StandInfo } from "./StandInfo";
import { StandForm } from "./StandForm";
import { useEditor } from "./EditorContext";
import { useMouseHandlers } from "./useMouseHandlers";

const GRID_COLS = 52; // 26m / 0.5m
const GRID_ROWS = 88; // 44m / 0.5m

const size = 16

const GridContainer = styled.div`
    display: grid;
    grid-template-rows: repeat(${GRID_ROWS}, ${size}px);
    grid-template-columns: repeat(${GRID_COLS}, ${size}px);
    gap: 1px;
    background: #ccc;
    overflow: auto;
`;

const Square = styled.div<{ selected: boolean }>`
    width: ${size}px;
    height: ${size}px;
    background: ${({ selected }) => (selected ? '#90ee90' : '#fff')};
    border: 1px solid #bbb;
    box-sizing: border-box;
`;

export const Grid = () => {
    const {
        start,
        end,
        handleMouseDown,
        handleMouseEnter,
        handleMouseUp,
    } = useMouseHandlers();

    const { stands } = useEditor();
    console.log('Stands:', stands);

    const isSelected = (row: number, col: number) => {
        if (!start || !end) return false;
        const rowMin = Math.min(start.row, end.row);
        const rowMax = Math.max(start.row, end.row);
        const colMin = Math.min(start.col, end.col);
        const colMax = Math.max(start.col, end.col);
        return row >= rowMin && row <= rowMax && col >= colMin && col <= colMax;
    };

    return (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24 }}>
            <RowIndexes rows={GRID_ROWS} />
            <GridContainer>
                {Array.from({ length: GRID_ROWS }).map((_, row) =>
                    Array.from({ length: GRID_COLS }).map((_, col) => (
                        <Square
                            key={`${row}-${col}`}
                            selected={isSelected(row, col)}
                            onMouseDown={() => handleMouseDown(row, col)}
                            onMouseEnter={() => handleMouseEnter(row, col)}
                            onMouseUp={handleMouseUp}
                        />
                    ))
                )}
            </GridContainer>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <StandInfo start={start} end={end} />
                <StandForm />
            </div>
        </div>
    );
}