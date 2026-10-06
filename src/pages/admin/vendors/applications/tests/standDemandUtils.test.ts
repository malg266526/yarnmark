import assert from 'node:assert/strict';
import test from 'node:test';
import { VENDOR_FORM_HIGH_INTEREST_MIN_REQUESTS } from '../../../../../domain/vendorApplications/vendorFormConstants.ts';
import { resolveStandDemandLevel } from '../utils/standDemandUtils.ts';

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
