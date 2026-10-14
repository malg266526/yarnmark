import assert from 'node:assert/strict';
import test from 'node:test';
import { isVendorFormAvailable, VENDOR_FORM_OPENS_AT_TIMESTAMP } from '../vendorFormAvailabilityUtils.ts';

test('vendor registration opens at 09:00 Polish summer time, equivalent to 07:00 UTC', () => {
  assert.equal(VENDOR_FORM_OPENS_AT_TIMESTAMP, Date.parse('2026-10-19T07:00:00Z'));
});

test('vendor registration is unavailable immediately before opening', () => {
  assert.equal(isVendorFormAvailable(VENDOR_FORM_OPENS_AT_TIMESTAMP - 1), false);
});

test('vendor registration is available exactly at opening', () => {
  assert.equal(isVendorFormAvailable(VENDOR_FORM_OPENS_AT_TIMESTAMP), true);
});

test('vendor registration remains available after opening', () => {
  assert.equal(isVendorFormAvailable(VENDOR_FORM_OPENS_AT_TIMESTAMP + 1), true);
});
