import test from 'node:test';
import assert from 'node:assert/strict';
import { compareStandIndexes, getStandAreaM2, groupStandsByType, matchesStandSearch } from './standListUtils.ts';
import type { StandProps } from '../StandProps.ts';

const createStand = (stand: Partial<StandProps> = {}): StandProps => ({
  id: 'stand-1',
  index: 'S1',
  type: 'standard',
  width: 3,
  height: 3.5,
  ...stand
});

test('getStandAreaM2 measures the box drawn on the grid', () => {
  const stand = createStand({ start: { row: 10, col: 4 }, end: { row: 16, col: 9 } });

  assert.equal(getStandAreaM2(stand), 10.5);
});

test('getStandAreaM2 falls back to the declared size when the stand has no box', () => {
  assert.equal(getStandAreaM2(createStand({ width: 2, height: 3 })), 6);
});

test('getStandAreaM2 reports the box size even when it disagrees with the declared size', () => {
  const stand = createStand({ width: 5, height: 3, start: { row: 0, col: 0 }, end: { row: 5, col: 12 } });

  assert.equal(getStandAreaM2(stand), 19.5);
});

test('matchesStandSearch accepts every stand for an empty query', () => {
  assert.equal(matchesStandSearch(createStand(), '   '), true);
});

test('matchesStandSearch matches the index regardless of case', () => {
  assert.equal(matchesStandSearch(createStand({ index: 'S12' }), 's1'), true);
  assert.equal(matchesStandSearch(createStand({ index: 'S12' }), 'p'), false);
});

test('matchesStandSearch matches the vendor name', () => {
  assert.equal(matchesStandSearch(createStand({ vendor: 'Wełna Bawełna' }), 'bawe'), true);
});

test('matchesStandSearch handles a stand without a vendor', () => {
  assert.equal(matchesStandSearch(createStand({ vendor: undefined }), 'bawe'), false);
});

test('compareStandIndexes sorts naturally, not alphabetically', () => {
  const sorted = [createStand({ index: 'S10' }), createStand({ index: 'S2' }), createStand({ index: 'S1' })]
    .sort(compareStandIndexes)
    .map((stand) => stand.index);

  assert.deepEqual(sorted, ['S1', 'S2', 'S10']);
});

test('groupStandsByType keeps the premium, standard, C, mini, other order', () => {
  const stands = [
    createStand({ id: '1', index: 'M1', type: 'mini' }),
    createStand({ id: '5', index: 'C1', type: 'c' }),
    createStand({ id: '2', index: 'a1', type: 'other' }),
    createStand({ id: '3', index: 'S1', type: 'standard' }),
    createStand({ id: '4', index: 'P1', type: 'premium' })
  ];

  assert.deepEqual(
    groupStandsByType(stands, '').map((group) => group.type),
    ['premium', 'standard', 'c', 'mini', 'other']
  );
});

test('groupStandsByType drops groups with no match and sorts inside a group', () => {
  const stands = [
    createStand({ id: '1', index: 'S10' }),
    createStand({ id: '2', index: 'S2' }),
    createStand({ id: '3', index: 'P1', type: 'premium' })
  ];

  const groups = groupStandsByType(stands, 's');

  assert.equal(groups.length, 1);
  assert.equal(groups[0].type, 'standard');
  assert.deepEqual(
    groups[0].stands.map((stand) => stand.index),
    ['S2', 'S10']
  );
});

test('groupStandsByType returns nothing when the query matches no stand', () => {
  assert.deepEqual(groupStandsByType([createStand()], 'zzz'), []);
});
