import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizeStandId, normalizeStandIds } from '../vendorFormStandIds.ts';

test('normalizeStandId converts hall object id to readable stand index', () => {
  assert.equal(normalizeStandId('mgl60s92-lscpjj7'), 'P2');
});

test('normalizeStandId keeps readable stand id unchanged', () => {
  assert.equal(normalizeStandId('S1'), 'S1');
});

test('normalizeStandIds deduplicates after normalization while preserving order', () => {
  assert.deepEqual(normalizeStandIds(['mgl60s92-lscpjj7', 'P2', 'mgl65qbi-2kfiih9']), ['P2', 'P3']);
});
