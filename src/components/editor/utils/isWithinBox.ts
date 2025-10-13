import { Coordinate } from '../StandProps';

export const isWithinBox = (row: number, col: number, start?: Coordinate, end?: Coordinate) => {
  if (!start || !end) return false;

  const rowMin = Math.min(start.row, end.row);
  const rowMax = Math.max(start.row, end.row);
  const colMin = Math.min(start.col, end.col);
  const colMax = Math.max(start.col, end.col);
  return row >= rowMin && row <= rowMax && col >= colMin && col <= colMax;
};
