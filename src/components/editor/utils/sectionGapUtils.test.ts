import test from 'node:test';
import assert from 'node:assert/strict';
import type { StandProps } from '../StandProps.ts';
import { MAX_SECTION_GAP_M, findSectionGaps, getSectionGapLineRect } from './sectionGapUtils.ts';
import { GAP_PX, ROW_PITCH_PX, SQUARE_PX } from './hallGeometry.ts';

const createStand = (index: string, top: number, left: number, bottom: number, right: number): StandProps => ({
  id: index,
  index,
  type: 'standard',
  start: { row: top, col: left },
  end: { row: bottom, col: right }
});

const describeGaps = (stands: StandProps[]) =>
  findSectionGaps(stands).map(
    ({ axis, fromIndex, toIndex, distanceM }) => `${fromIndex}-${toIndex} ${axis} ${distanceM}`
  );

test('findSectionGaps measures between the first facing stands of two sections', () => {
  const stands = [
    createStand('P5', 11, 1, 21, 6),
    createStand('c3', 22, 1, 27, 6),
    createStand('M1', 13, 15, 18, 18),
    createStand('M2', 19, 15, 24, 18)
  ];

  assert.deepEqual(describeGaps(stands), ['P5-M1 horizontal 4']);
});

test('findSectionGaps does not measure inside a section of touching stands', () => {
  const stands = [createStand('S1', 0, 0, 5, 6), createStand('S2', 0, 7, 5, 13)];

  assert.deepEqual(describeGaps(stands), []);
});

test('findSectionGaps skips pairs with another stand in the aisle between them', () => {
  const stands = [createStand('A', 0, 0, 5, 5), createStand('B', 0, 10, 5, 15), createStand('C', 0, 20, 5, 25)];

  assert.deepEqual(describeGaps(stands), ['A-B horizontal 2', 'B-C horizontal 2']);
});

test('findSectionGaps measures vertical aisles and keeps the shortest one per pair of sections', () => {
  const stands = [
    createStand('Top', 0, 0, 5, 30),
    createStand('Near', 12, 0, 15, 5),
    createStand('Far', 20, 10, 25, 15),
    createStand('Link', 16, 0, 19, 5),
    createStand('Link2', 20, 0, 25, 9)
  ];

  assert.deepEqual(describeGaps(stands), ['Top-Near vertical 3']);
});

test('findSectionGaps leaves out open floor wider than an aisle', () => {
  const aisleCells = MAX_SECTION_GAP_M * 2;
  const stands = [
    createStand('A', 0, 0, 5, 5),
    createStand('B', 0, 6 + aisleCells, 5, 11 + aisleCells),
    createStand('C', 10, 0, 15, 5),
    createStand('D', 10, 7 + aisleCells, 15, 12 + aisleCells)
  ];

  assert.deepEqual(describeGaps(stands), [`A-B horizontal ${MAX_SECTION_GAP_M}`, 'A-C vertical 2', 'B-D vertical 2']);
});

test('getSectionGapLineRect spans exactly the empty cells between the two stand edges', () => {
  const [gap] = findSectionGaps([createStand('A', 0, 0, 1, 1), createStand('B', 0, 4, 1, 5)]);

  assert.deepEqual(getSectionGapLineRect(gap), {
    left: 2 * ROW_PITCH_PX - GAP_PX,
    top: (0 + ROW_PITCH_PX + SQUARE_PX) / 2,
    width: 2 * ROW_PITCH_PX + GAP_PX,
    height: 0,
    labelLeft: 2 * ROW_PITCH_PX - GAP_PX + (2 * ROW_PITCH_PX + GAP_PX) / 2,
    labelTop: (0 + ROW_PITCH_PX + SQUARE_PX) / 2
  });
});
