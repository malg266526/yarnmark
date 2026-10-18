import assert from 'node:assert/strict';
import test from 'node:test';
import {
  estimateServerNow,
  isVendorFormAvailable,
  parseServerDateHeader,
  VENDOR_FORM_OPENS_AT_TIMESTAMP
} from '../vendorFormAvailabilityUtils.ts';

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

test('server Date header is parsed to a timestamp', () => {
  assert.equal(parseServerDateHeader('Mon, 19 Oct 2026 07:00:00 GMT'), Date.parse('2026-10-19T07:00:00Z'));
});

test('missing or malformed server Date header yields no timestamp', () => {
  assert.equal(parseServerDateHeader(null), undefined);
  assert.equal(parseServerDateHeader('not a date'), undefined);
});

test('server time advances by monotonic time elapsed since sync', () => {
  const sync = { serverDateMs: VENDOR_FORM_OPENS_AT_TIMESTAMP - 1_000, syncedAtMonotonicMs: 5_000 };

  assert.equal(estimateServerNow(sync, 5_999), VENDOR_FORM_OPENS_AT_TIMESTAMP - 1);
  assert.equal(isVendorFormAvailable(estimateServerNow(sync, 5_999)), false);
  assert.equal(isVendorFormAvailable(estimateServerNow(sync, 6_000)), true);
});

test('server time never moves backwards before the sync point', () => {
  const sync = { serverDateMs: VENDOR_FORM_OPENS_AT_TIMESTAMP - 1_000, syncedAtMonotonicMs: 5_000 };

  assert.equal(estimateServerNow(sync, 4_000), VENDOR_FORM_OPENS_AT_TIMESTAMP - 1_000);
});
