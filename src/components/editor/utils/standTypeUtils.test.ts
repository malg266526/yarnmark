import test from 'node:test';
import assert from 'node:assert/strict';
import type { StandProps } from '../StandProps.ts';
import { normalizeStandType } from './standTypeUtils.ts';

const createStand = (overrides: Partial<StandProps>): StandProps => ({
  id: 'id',
  index: 'S1',
  type: 'standard',
  ...overrides
});

test('normalizeStandType turns stands numbered with C into C stands', () => {
  assert.equal(normalizeStandType(createStand({ index: 'C1', type: 'standard' })).type, 'c');
  assert.equal(normalizeStandType(createStand({ index: 'c2', type: 'other' })).type, 'c');
});

test('normalizeStandType keeps other stands untouched', () => {
  const stand = createStand({ index: 'S1', type: 'standard' });
  const cStand = createStand({ index: 'C3', type: 'c' });

  assert.equal(normalizeStandType(stand), stand);
  assert.equal(normalizeStandType(cStand), cStand);
});
