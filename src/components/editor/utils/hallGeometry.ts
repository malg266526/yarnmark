export const SQUARE_SIZE_M = 0.5;
export const HALL_WIDTH_M = 26;
export const HALL_HEIGHT_M = 44;
export const GRID_COLS = HALL_WIDTH_M / SQUARE_SIZE_M;
export const GRID_ROWS = HALL_HEIGHT_M / SQUARE_SIZE_M;

export const SQUARE_PX = 16;
export const GAP_PX = 1;
export const ROW_PITCH_PX = SQUARE_PX + GAP_PX;

export const gridWidthPx = GRID_COLS * SQUARE_PX + (GRID_COLS - 1) * GAP_PX;
export const gridHeightPx = GRID_ROWS * SQUARE_PX + (GRID_ROWS - 1) * GAP_PX;

export const metersToSquares = (meters: number) => Math.ceil(meters / SQUARE_SIZE_M);

export const clampStandOriginToHall = (origin: { row: number; col: number }, widthM: number, heightM: number) => {
  const widthSquares = metersToSquares(widthM);
  const heightSquares = metersToSquares(heightM);
  const maxRowStart = Math.max(GRID_ROWS - heightSquares, 0);
  const maxColStart = Math.max(GRID_COLS - widthSquares, 0);

  return {
    row: Math.min(Math.max(origin.row, 0), maxRowStart),
    col: Math.min(Math.max(origin.col, 0), maxColStart)
  };
};
