import assert from 'node:assert/strict';
import test from 'node:test';
import { resolveStandType } from '../vendorStandTypeUtils.ts';

test('resolveStandType maps hall stand prefixes to vendor stand types', () => {
  assert.equal(resolveStandType('S12'), 'standard');
  assert.equal(resolveStandType('C1'), 'standard');
  assert.equal(resolveStandType('P5'), 'premium');
  assert.equal(resolveStandType('M7'), 'mini');
});

test('resolveStandType returns null for entrances, technical areas and unknown ids', () => {
  assert.equal(resolveStandType('a0'), null);
  assert.equal(resolveStandType('A2'), null);
  assert.equal(resolveStandType('X1'), null);
  assert.equal(resolveStandType(''), null);
});
