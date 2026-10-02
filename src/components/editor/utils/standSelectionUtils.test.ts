import test from 'node:test';
import assert from 'node:assert/strict';
import { isExistingStand } from './standSelectionUtils.ts';
import type { StandProps } from '../StandProps.ts';

const createStand = (id: string): StandProps => ({ id, index: 'S1', type: 'standard' });

test('isExistingStand recognises a stand already stored in the editor', () => {
  assert.equal(isExistingStand([createStand('a'), createStand('b')], createStand('b')), true);
});

test('isExistingStand rejects a stand that is not stored yet', () => {
  assert.equal(isExistingStand([createStand('a')], createStand('default_00')), false);
});

test('isExistingStand rejects any stand when the editor is empty', () => {
  assert.equal(isExistingStand([], createStand('a')), false);
});
