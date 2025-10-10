import React from "react";
import styled from "styled-components";
import { RowIndexes } from "./RowIndexes";
import { StandInfo } from "./StandInfo";
import { StandForm } from "./StandForm";
import { useEditor } from "./EditorContext";
import { useMouseHandlers } from "./utils/useMouseHandlers";
import { RedesignSpacings } from "../../styles/spacings";
import { StandColorsMap } from "./StandProps";
import { isWithinBox } from "./utils/isWithinBox";
import { CtaButton } from "../Button";
import { saveHallToFile } from "./utils/saveHallToFile";
import { StandList } from "./StandList";

const GRID_COLS = 52; // 26m / 0.5m
const GRID_ROWS = 88; // 44m / 0.5m

const size = 16

const EditorContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${RedesignSpacings.md};
`;

const StandDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${RedesignSpacings.md};
`;

const GridContainer = styled.div`
    display: grid;
    grid-template-rows: repeat(${GRID_ROWS}, ${size}px);
    grid-template-columns: repeat(${GRID_COLS}, ${size}px);
    gap: 1px;
    background: #ccc;
    overflow: auto;
`;

const Square = styled.div<{
    background: string;
    isInsideStand?: boolean;
}>`
  width: ${size}px;
  height: ${size}px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  user-select: none;
  font-size: 0.8rem;
  background: ${({ background }) => background};
  border: ${({ isInsideStand }) =>
        isInsideStand ? "1px solid #f0f0f0" : "1px solid #bbb"};
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

export const Editor = () => {
    const {
        start,
        end,
        handleMouseDown,
        handleMouseEnter,
        handleMouseUp,
        handleClick
    } = useMouseHandlers();

    const { stands, currentStand } = useEditor();

    const getStandAtCell = (row: number, col: number) => {
        return stands.find((stand) =>
            isWithinBox(row, col, stand.start, stand.end)
        ) || null;
    };

    const isSelected = (row: number, col: number) => isWithinBox(row, col, start, end);

    return (
        <EditorContainer>
            <RowIndexes rows={GRID_ROWS} />
            <GridContainer>
                {Array.from({ length: GRID_ROWS }).map((_, row) =>
                    Array.from({ length: GRID_COLS }).map((_, col) => {
                        const stand = getStandAtCell(row, col);
                        const background = stand
                            ? StandColorsMap[stand.color || "taken"]
                            : isSelected(row, col)
                                ? "#90ee90"
                                : "#fff";


                        const hasCoords = stand?.start && stand?.end;

                        const isMiddle =
                            hasCoords &&
                            row === Math.floor((stand.start!.row + stand.end!.row) / 2) &&
                            col === Math.floor((stand.start!.col + stand.end!.col) / 2);

                        const isInsideStand = !!stand;

                        return (
                            <Square
                                key={`${row}-${col}`}
                                background={background}
                                isInsideStand={isInsideStand}
                                onMouseDown={() => handleMouseDown(row, col)}
                                onMouseEnter={() => handleMouseEnter(row, col)}
                                onMouseUp={handleMouseUp}
                                onClick={() =>
                                    handleClick(
                                        row,
                                        col,
                                        currentStand.width ?? 1,
                                        currentStand.height ?? 1
                                    )
                                }
                            >
                                {isMiddle && stand ? <StandIndex>{stand.index}</StandIndex> : ""}
                            </Square>
                        );
                    })
                )}
            </GridContainer>
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
}