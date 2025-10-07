import { Coordinate } from "../StandProps";

const SQUARE_SIZE_M = 0.5; // 1 square = 0.5 meters

export const getEndFromStart = (
    start: { row: number; col: number },
    widthM: number,
    heightM: number,
    isHorizontal: boolean
) => {
    const widthSquares = Math.ceil(widthM / SQUARE_SIZE_M);
    const heightSquares = Math.ceil(heightM / SQUARE_SIZE_M);

    const w = isHorizontal ? heightSquares : widthSquares;
    const h = isHorizontal ? widthSquares : heightSquares;

    return {
        row: start.row + h - 1,
        col: start.col + w - 1,
    };
};