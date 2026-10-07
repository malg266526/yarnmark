import assert from 'node:assert/strict';
import test from 'node:test';
import { VENDOR_FORM_HIGH_INTEREST_MIN_REQUESTS } from '../../../../../domain/vendorApplications/vendorFormConstants.ts';
import { buildHallCoverage, resolveStandDemandLevel } from '../utils/standDemandUtils.ts';

test('resolveStandDemandLevel buckets request counts for the heatmap', () => {
  assert.equal(resolveStandDemandLevel(0), 'none');
  assert.equal(resolveStandDemandLevel(1), 'low');
  assert.equal(resolveStandDemandLevel(2), 'medium');
});

test('resolveStandDemandLevel uses the same high-interest threshold as the public form', () => {
  assert.equal(resolveStandDemandLevel(VENDOR_FORM_HIGH_INTEREST_MIN_REQUESTS), 'high');
  assert.equal(resolveStandDemandLevel(VENDOR_FORM_HIGH_INTEREST_MIN_REQUESTS + 10), 'high');
  assert.equal(resolveStandDemandLevel(VENDOR_FORM_HIGH_INTEREST_MIN_REQUESTS - 1), 'medium');
});

test('resolveStandDemandLevel treats a negative count as no demand', () => {
  assert.equal(resolveStandDemandLevel(-1), 'none');
});

test('buildHallCoverage splits stands into requested and untouched ones', () => {
  const coverage = buildHallCoverage(
    ['S1', 'S2', 'S3', 'P1'],
    new Map([
      ['S1', 3],
      ['P1', 1]
    ])
  );

  assert.deepEqual(coverage, { freeStandIds: ['S2', 'S3'], requestedStandCount: 2, totalStandCount: 4 });
});

test('buildHallCoverage ignores demand for stands that are not on the list', () => {
  const coverage = buildHallCoverage(['S1'], new Map([['M9', 4]]));

  assert.deepEqual(coverage, { freeStandIds: ['S1'], requestedStandCount: 0, totalStandCount: 1 });
});

test('buildHallCoverage reports full coverage when every stand has a request', () => {
  const coverage = buildHallCoverage(
    ['S1', 'S2'],
    new Map([
      ['S1', 1],
      ['S2', 2]
    ])
  );

  assert.deepEqual(coverage, { freeStandIds: [], requestedStandCount: 2, totalStandCount: 2 });
});
