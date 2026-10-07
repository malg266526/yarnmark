import test from 'node:test';
import assert from 'node:assert/strict';
import {
  HALL_2026_AREA_M2,
  HALL_AREA_M2,
  formatDecimal,
  formatSignedDifference,
  summarizeLayout
} from './layoutSummaryUtils.ts';
import type { StandProps } from '../StandProps.ts';

const createStand = (stand: Partial<StandProps> = {}): StandProps => ({
  id: 'stand-1',
  index: 'S1',
  type: 'standard',
  ...stand
});

test('summarizeLayout counts sellable stands per type and measures them on the grid', () => {
  const summary = summarizeLayout([
    createStand({ id: 'p', type: 'premium', start: { row: 0, col: 0 }, end: { row: 10, col: 5 } }),
    createStand({ id: 's1', type: 'standard', start: { row: 0, col: 6 }, end: { row: 6, col: 11 } }),
    createStand({ id: 's2', type: 'standard', start: { row: 7, col: 6 }, end: { row: 13, col: 11 } }),
    createStand({ id: 'm', type: 'mini', start: { row: 20, col: 0 }, end: { row: 25, col: 3 } })
  ]);

  assert.deepEqual(summary.byType, {
    premium: { count: 1, areaM2: 16.5 },
    standard: { count: 2, areaM2: 21 },
    mini: { count: 1, areaM2: 6 }
  });
  assert.deepEqual(summary.sellable, { count: 4, areaM2: 43.5 });
  assert.equal(summary.hallAreaM2, HALL_AREA_M2);
  assert.equal(summary.hallUsagePercent, (43.5 / HALL_AREA_M2) * 100);
});

test('summarizeLayout leaves technical stands out of the sellable totals', () => {
  const summary = summarizeLayout([
    createStand({ id: 'entrance', type: 'other', start: { row: 0, col: 0 }, end: { row: 5, col: 5 } })
  ]);

  assert.deepEqual(summary.sellable, { count: 0, areaM2: 0 });
  assert.equal(summary.hallUsagePercent, 0);
});

test('summarizeLayout measures hall usage against the given hall area', () => {
  const summary = summarizeLayout(
    [createStand({ start: { row: 0, col: 0 }, end: { row: 6, col: 5 } })],
    HALL_2026_AREA_M2
  );

  assert.equal(HALL_2026_AREA_M2, 1144);
  assert.equal(summary.hallAreaM2, 1144);
  assert.equal(summary.hallUsagePercent, (10.5 / 1144) * 100);
});

test('formatSignedDifference prefixes the sign and hides rounding noise', () => {
  assert.equal(formatSignedDifference(4, 'en'), '+4');
  assert.equal(formatSignedDifference(-1.25, 'en'), '-1.3');
  assert.equal(formatSignedDifference(30.000000001, 'pl'), '+30');
  assert.equal(formatSignedDifference(0.00001, 'pl'), '0');
});

test('formatDecimal uses the locale separator and at most one fraction digit', () => {
  assert.equal(formatDecimal(41.889, 'pl'), '41,9');
  assert.equal(formatDecimal(534, 'en'), '534');
});
