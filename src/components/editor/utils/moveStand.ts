import type { Coordinate } from '../StandProps';
import { GRID_COLS, GRID_ROWS } from './hallGeometry.ts';

export interface StandBoxSize {
  rows: number;
  cols: number;
}

export interface StandBox {
  start: Coordinate;
  end: Coordinate;
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export const getStandOrigin = (start: Coordinate, end: Coordinate): Coordinate => ({
  row: Math.min(start.row, end.row),
  col: Math.min(start.col, end.col)
});

export const getStandBoxSize = (start: Coordinate, end: Coordinate): StandBoxSize => ({
  rows: Math.abs(end.row - start.row) + 1,
  cols: Math.abs(end.col - start.col) + 1
});

export const getMovedStandBox = (size: StandBoxSize, grabOffset: Coordinate, hovered: Coordinate): StandBox => {
  const startRow = clamp(hovered.row - grabOffset.row, 0, GRID_ROWS - size.rows);
  const startCol = clamp(hovered.col - grabOffset.col, 0, GRID_COLS - size.cols);

  return {
    start: { row: startRow, col: startCol },
    end: { row: startRow + size.rows - 1, col: startCol + size.cols - 1 }
  };
};
