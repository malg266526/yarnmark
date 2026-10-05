import assert from 'node:assert/strict';
import test from 'node:test';
import { resolveVendorFormDraftStatus } from '../vendorFormDraftStatus.ts';

test('resolveVendorFormDraftStatus returns none for a fresh untouched form', () => {
  assert.equal(resolveVendorFormDraftStatus({ isComplete: false, isDirty: false, wasRestored: false }), 'none');
});

test('resolveVendorFormDraftStatus returns restored for an untouched restored draft', () => {
  assert.equal(resolveVendorFormDraftStatus({ isComplete: false, isDirty: false, wasRestored: true }), 'restored');
});

test('resolveVendorFormDraftStatus returns saved once the form is edited', () => {
  assert.equal(resolveVendorFormDraftStatus({ isComplete: false, isDirty: true, wasRestored: true }), 'saved');
  assert.equal(resolveVendorFormDraftStatus({ isComplete: false, isDirty: true, wasRestored: false }), 'saved');
});

test('resolveVendorFormDraftStatus returns none after a completed submission', () => {
  assert.equal(resolveVendorFormDraftStatus({ isComplete: true, isDirty: false, wasRestored: true }), 'none');
});
