import { SQUARE_SIZE_M } from './hallGeometry';

export const getEndFromStart = (start: { row: number; col: number }, widthM: number, heightM: number) => {
  const widthSquares = Math.ceil(widthM / SQUARE_SIZE_M);
  const heightSquares = Math.ceil(heightM / SQUARE_SIZE_M);

  return {
    row: start.row + heightSquares - 1,
    col: start.col + widthSquares - 1
  };
};
