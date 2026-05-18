import test from 'node:test';
import assert from 'node:assert/strict';
import {
  clampStandOriginToHall,
  GAP_PX,
  GRID_COLS,
  GRID_ROWS,
  HALL_HEIGHT_M,
  HALL_WIDTH_M,
  SQUARE_PX,
  SQUARE_SIZE_M,
  gridHeightPx,
  gridWidthPx
} from './hallGeometry.ts';

test('hall geometry matches the physical hall dimensions', () => {
  assert.equal(GRID_COLS * SQUARE_SIZE_M, HALL_WIDTH_M);
  assert.equal(GRID_ROWS * SQUARE_SIZE_M, HALL_HEIGHT_M);
});

test('grid pixel size has exactly one gap between cells', () => {
  assert.equal(gridWidthPx, GRID_COLS * SQUARE_PX + (GRID_COLS - 1) * GAP_PX);
  assert.equal(gridHeightPx, GRID_ROWS * SQUARE_PX + (GRID_ROWS - 1) * GAP_PX);
});

test('clampStandOriginToHall keeps a stand fully inside the bottom-right corner', () => {
  assert.deepEqual(clampStandOriginToHall({ row: 87, col: 51 }, 3.5, 3), {
    row: 82,
    col: 45
  });
});

test('clampStandOriginToHall does not move a stand that already fits', () => {
  assert.deepEqual(clampStandOriginToHall({ row: 10, col: 12 }, 3, 3), {
    row: 10,
    col: 12
  });
});
