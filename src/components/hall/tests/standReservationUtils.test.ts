import test from 'node:test';
import assert from 'node:assert/strict';
import { isReservedStand, resolveStandColorKey } from '../standReservationUtils.ts';
import type { HallStand } from '../hallStands.ts';

const createStand = (stand: Partial<HallStand>): HallStand => ({
  id: 'id',
  index: 'S1',
  type: 'standard',
  color: 'normal1',
  width: 3,
  height: 3.5,
  isHorizontal: false,
  start: { row: 0, col: 0 },
  end: { row: 5, col: 5 },
  ...stand
});

test('isReservedStand reports a stand handed to a vendor', () => {
  assert.equal(isReservedStand(createStand({ vendor: 'Włóczykijki s.c.' })), true);
  assert.equal(isReservedStand(createStand({})), false);
});

test('isReservedStand still reports stands marked reserved by colour alone', () => {
  assert.equal(isReservedStand(createStand({ color: 'taken' })), true);
  assert.equal(isReservedStand(createStand({ color: 'taken2' })), true);
});

test('resolveStandColorKey greys out a stand that has a vendor', () => {
  assert.equal(resolveStandColorKey(createStand({ color: 'premium', vendor: 'Włóczykijki s.c.' })), 'taken');
});

test('resolveStandColorKey keeps the shade of an already reserved stand', () => {
  assert.equal(resolveStandColorKey(createStand({ color: 'taken2', vendor: 'Włóczykijki s.c.' })), 'taken2');
});

test('resolveStandColorKey leaves a free stand alone', () => {
  assert.equal(resolveStandColorKey(createStand({ color: 'premium' })), 'premium');
});
