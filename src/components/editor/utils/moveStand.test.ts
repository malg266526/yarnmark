import test from 'node:test';
import assert from 'node:assert/strict';
import { getMovedStandBox, getStandBoxSize, getStandOrigin } from './moveStand.ts';
import { GRID_COLS, GRID_ROWS } from './hallGeometry.ts';

test('getStandOrigin returns the top-left corner regardless of start/end order', () => {
  assert.deepEqual(getStandOrigin({ row: 5, col: 7 }, { row: 2, col: 3 }), { row: 2, col: 3 });
});

test('getStandBoxSize counts inclusive rows and cols', () => {
  assert.deepEqual(getStandBoxSize({ row: 2, col: 3 }, { row: 4, col: 3 }), { rows: 3, cols: 1 });
});

test('getMovedStandBox keeps the grabbed cell under the pointer', () => {
  const size = { rows: 2, cols: 2 };
  const grabOffset = { row: 1, col: 0 };

  assert.deepEqual(getMovedStandBox(size, grabOffset, { row: 10, col: 4 }), {
    start: { row: 9, col: 4 },
    end: { row: 10, col: 5 }
  });
});

test('getMovedStandBox clamps the stand inside the hall bounds', () => {
  const size = { rows: 3, cols: 4 };

  assert.deepEqual(getMovedStandBox(size, { row: 0, col: 0 }, { row: -5, col: -5 }), {
    start: { row: 0, col: 0 },
    end: { row: 2, col: 3 }
  });

  assert.deepEqual(getMovedStandBox(size, { row: 0, col: 0 }, { row: 999, col: 999 }), {
    start: { row: GRID_ROWS - 3, col: GRID_COLS - 4 },
    end: { row: GRID_ROWS - 1, col: GRID_COLS - 1 }
  });
});
