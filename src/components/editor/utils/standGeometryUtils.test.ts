import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getResizedStandBox,
  getStandOutlineRect,
  resizeStand,
  resizeStandToDeclaredSize
} from './standGeometryUtils.ts';
import { GAP_PX, GRID_COLS, GRID_ROWS, ROW_PITCH_PX } from './hallGeometry.ts';
import type { StandProps } from '../StandProps.ts';

const createStand = (stand: Partial<StandProps> = {}): StandProps => ({
  id: 'stand-1',
  index: 'S1',
  type: 'standard',
  width: 3,
  height: 3.5,
  start: { row: 10, col: 4 },
  end: { row: 16, col: 9 },
  ...stand
});

test('getResizedStandBox keeps the top-left corner and grows the box', () => {
  assert.deepEqual(getResizedStandBox(createStand(), 3, 5.5), {
    start: { row: 10, col: 4 },
    end: { row: 20, col: 9 }
  });
});

test('getResizedStandBox shrinks the box from the top-left corner', () => {
  assert.deepEqual(getResizedStandBox(createStand(), 2, 3), {
    start: { row: 10, col: 4 },
    end: { row: 15, col: 7 }
  });
});

test('getResizedStandBox resolves the origin regardless of start/end order', () => {
  const stand = createStand({ start: { row: 16, col: 9 }, end: { row: 10, col: 4 } });

  assert.deepEqual(getResizedStandBox(stand, 3, 3.5), {
    start: { row: 10, col: 4 },
    end: { row: 16, col: 9 }
  });
});

test('getResizedStandBox clamps a stand growing past the right and bottom edges', () => {
  const stand = createStand({
    start: { row: GRID_ROWS - 3, col: GRID_COLS - 3 },
    end: { row: GRID_ROWS - 1, col: GRID_COLS - 1 }
  });

  assert.deepEqual(getResizedStandBox(stand, 3, 5.5), {
    start: { row: GRID_ROWS - 11, col: GRID_COLS - 6 },
    end: { row: GRID_ROWS - 1, col: GRID_COLS - 1 }
  });
});

test('getResizedStandBox rounds partial squares up', () => {
  assert.deepEqual(getResizedStandBox(createStand(), 1.2, 1.2), {
    start: { row: 10, col: 4 },
    end: { row: 12, col: 6 }
  });
});

test('getResizedStandBox returns null for a stand without coordinates', () => {
  assert.equal(getResizedStandBox(createStand({ start: undefined, end: undefined }), 3, 3), null);
});

test('resizeStand stores the new size together with the recalculated box', () => {
  const resizedStand = resizeStand(createStand(), 3, 5.5);

  assert.equal(resizedStand.width, 3);
  assert.equal(resizedStand.height, 5.5);
  assert.deepEqual(resizedStand.start, { row: 10, col: 4 });
  assert.deepEqual(resizedStand.end, { row: 20, col: 9 });
});

test('resizeStand only stores the size when the stand has no coordinates', () => {
  const resizedStand = resizeStand(createStand({ start: undefined, end: undefined }), 2, 3);

  assert.equal(resizedStand.width, 2);
  assert.equal(resizedStand.height, 3);
  assert.equal(resizedStand.start, undefined);
  assert.equal(resizedStand.end, undefined);
});

test('resizeStandToDeclaredSize recalculates the box from the declared size', () => {
  const stand = createStand({ width: 3, height: 5.5 });

  assert.deepEqual(resizeStandToDeclaredSize(stand).end, { row: 20, col: 9 });
});

test('resizeStandToDeclaredSize leaves a stand with a cleared size untouched', () => {
  const stand = createStand({ width: undefined });

  assert.deepEqual(resizeStandToDeclaredSize(stand), stand);
});

test('getStandOutlineRect covers the whole stand including inner gaps', () => {
  assert.deepEqual(getStandOutlineRect(createStand()), {
    left: 4 * ROW_PITCH_PX,
    top: 10 * ROW_PITCH_PX,
    width: 6 * ROW_PITCH_PX - GAP_PX,
    height: 7 * ROW_PITCH_PX - GAP_PX
  });
});

test('getStandOutlineRect anchors on the top-left corner regardless of start/end order', () => {
  const stand = createStand({ start: { row: 16, col: 9 }, end: { row: 10, col: 4 } });

  assert.deepEqual(getStandOutlineRect(stand), getStandOutlineRect(createStand()));
});

test('getStandOutlineRect returns null for a stand without coordinates', () => {
  assert.equal(getStandOutlineRect(createStand({ start: undefined, end: undefined })), null);
});
