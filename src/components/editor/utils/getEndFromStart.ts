import { Coordinate } from '../StandProps';

const SQUARE_SIZE_M = 0.5; // 1 square = 0.5 meters

export const getEndFromStart = (start: { row: number; col: number }, widthM: number, heightM: number) => {
  const widthSquares = Math.ceil(widthM / SQUARE_SIZE_M);
  const heightSquares = Math.ceil(heightM / SQUARE_SIZE_M);

  return {
    row: start.row + heightSquares - 1,
    col: start.col + widthSquares - 1
  };
};
