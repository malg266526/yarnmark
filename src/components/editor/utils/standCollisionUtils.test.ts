import test from 'node:test';
import assert from 'node:assert/strict';
import { findStandCollisions } from './standCollisionUtils.ts';
import type { StandProps } from '../StandProps.ts';

const createStand = (stand: Partial<StandProps> = {}): StandProps => ({
  id: 'stand-1',
  index: 'S1',
  type: 'standard',
  ...stand
});

test('findStandCollisions returns nothing for stands that only touch edges of neighbouring cells', () => {
  const stands = [
    createStand({ id: 'a', start: { row: 0, col: 0 }, end: { row: 5, col: 6 } }),
    createStand({ id: 'b', start: { row: 0, col: 7 }, end: { row: 5, col: 13 } })
  ];

  assert.deepEqual(findStandCollisions(stands), []);
});

test('findStandCollisions reports the overlapping cells of two stands', () => {
  const first = createStand({ id: 'a', index: 'S1', start: { row: 0, col: 0 }, end: { row: 5, col: 6 } });
  const second = createStand({ id: 'b', index: 'S2', start: { row: 4, col: 5 }, end: { row: 9, col: 11 } });

  assert.deepEqual(findStandCollisions([first, second]), [
    { first, second, overlap: { start: { row: 4, col: 5 }, end: { row: 5, col: 6 } } }
  ]);
});

test('findStandCollisions normalizes boxes drawn from bottom-right to top-left', () => {
  const first = createStand({ id: 'a', start: { row: 5, col: 6 }, end: { row: 0, col: 0 } });
  const second = createStand({ id: 'b', start: { row: 2, col: 2 }, end: { row: 3, col: 3 } });

  assert.deepEqual(findStandCollisions([first, second])[0].overlap, {
    start: { row: 2, col: 2 },
    end: { row: 3, col: 3 }
  });
});

test('findStandCollisions reports every colliding pair once', () => {
  const stands = [
    createStand({ id: 'a', start: { row: 0, col: 0 }, end: { row: 9, col: 9 } }),
    createStand({ id: 'b', start: { row: 1, col: 1 }, end: { row: 2, col: 2 } }),
    createStand({ id: 'c', start: { row: 8, col: 8 }, end: { row: 12, col: 12 } })
  ];

  assert.deepEqual(
    findStandCollisions(stands).map(({ first, second }) => [first.id, second.id]),
    [
      ['a', 'b'],
      ['a', 'c']
    ]
  );
});

test('findStandCollisions skips stands without grid coordinates', () => {
  const stands = [
    createStand({ id: 'a', start: { row: 0, col: 0 }, end: { row: 9, col: 9 } }),
    createStand({ id: 'b' })
  ];

  assert.deepEqual(findStandCollisions(stands), []);
});
