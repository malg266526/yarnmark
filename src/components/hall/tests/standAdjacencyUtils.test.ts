import test from 'node:test';
import assert from 'node:assert/strict';
import { areStandsAdjacent, getAdjacentStandIndexes, getPairableStandIndexes } from '../standAdjacencyUtils.ts';
import type { HallStand } from '../hallStands.ts';

const createStand = (index: string, top: number, left: number, bottom: number, right: number): HallStand => ({
  id: index,
  index,
  type: 'standard',
  color: 'normal1',
  width: 3,
  height: 3.5,
  isHorizontal: false,
  start: { row: top, col: left },
  end: { row: bottom, col: right }
});

test('areStandsAdjacent accepts stands sharing a vertical edge', () => {
  assert.equal(areStandsAdjacent(createStand('S1', 0, 13, 5, 19), createStand('S2', 0, 20, 5, 26)), true);
});

test('areStandsAdjacent accepts stands sharing a horizontal edge', () => {
  assert.equal(areStandsAdjacent(createStand('S28', 52, 15, 58, 20), createStand('S30', 59, 15, 65, 20)), true);
});

test('areStandsAdjacent rejects stands separated by an aisle', () => {
  assert.equal(areStandsAdjacent(createStand('S1', 0, 0, 5, 5), createStand('S2', 0, 10, 5, 15)), false);
});

test('areStandsAdjacent rejects stands touching only at a corner', () => {
  assert.equal(areStandsAdjacent(createStand('A', 0, 0, 5, 5), createStand('B', 6, 6, 11, 11)), false);
});

test('getAdjacentStandIndexes lists only the neighbours of the anchor stand', () => {
  const stands = [
    createStand('S1', 0, 13, 5, 19),
    createStand('S2', 0, 20, 5, 26),
    createStand('S3', 0, 27, 5, 33),
    createStand('far', 40, 0, 45, 5)
  ];

  assert.deepEqual(getAdjacentStandIndexes('S2', stands), ['S1', 'S3']);
});

test('getAdjacentStandIndexes returns nothing for an unknown stand', () => {
  assert.deepEqual(getAdjacentStandIndexes('nope', [createStand('S1', 0, 0, 5, 5)]), []);
});

test('getPairableStandIndexes narrows the map to the neighbours of an open pair', () => {
  const stands = [createStand('S1', 0, 13, 5, 19), createStand('S2', 0, 20, 5, 26), createStand('far', 40, 0, 45, 5)];

  assert.deepEqual(getPairableStandIndexes(stands, 'S1'), ['S2']);
});

test('getPairableStandIndexes hides stands that have no neighbour to pair with', () => {
  const stands = [createStand('S1', 0, 13, 5, 19), createStand('S2', 0, 20, 5, 26), createStand('alone', 40, 0, 45, 5)];

  assert.deepEqual(getPairableStandIndexes(stands, null), ['S1', 'S2']);
});
