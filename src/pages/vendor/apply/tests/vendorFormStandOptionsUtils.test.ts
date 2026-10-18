import assert from 'node:assert/strict';
import test from 'node:test';
import type { HallStand } from '../../../../components/hall/hallStands.ts';
import { getFreeNeighbourStandIds, getUnpairableStandIds } from '../vendorFormStandOptionsUtils.ts';

const createStand = (index: string, col: number): HallStand => ({
  id: index,
  index,
  type: 'standard',
  color: 'normal1',
  width: 3,
  height: 3.5,
  isHorizontal: false,
  start: { row: 0, col },
  end: { row: 0, col }
});

const row = [createStand('S1', 0), createStand('S2', 1), createStand('S3', 2), createStand('S9', 9)];

test('getFreeNeighbourStandIds lists the touching stands that nobody picked yet', () => {
  assert.deepEqual(getFreeNeighbourStandIds(row, 'S2', ['S2']), ['S1', 'S3']);
  assert.deepEqual(getFreeNeighbourStandIds(row, 'S2', ['S2', 'S1']), ['S3']);
});

test('getUnpairableStandIds reports single options without a free neighbour', () => {
  assert.deepEqual(getUnpairableStandIds(row, [['S1'], ['S9']]), ['S9']);
  assert.deepEqual(getUnpairableStandIds(row, [['S1'], ['S2', 'S3']]), ['S1']);
});
