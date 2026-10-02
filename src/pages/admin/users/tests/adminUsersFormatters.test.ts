import assert from 'node:assert/strict';
import test from 'node:test';
import { formatDateTime, resolveAdminUserStatusLabel } from '../utils/adminUsersFormatters.ts';

test('formatDateTime formats ISO timestamp for locale', () => {
  assert.equal(formatDateTime('2026-05-11T10:30:00.000Z', 'en-US'), 'May 11, 2026 at 12:30:00 PM');
});

test('resolveAdminUserStatusLabel translates a known status', () => {
  assert.equal(
    resolveAdminUserStatusLabel('pending', (translationKey) => `translated:${translationKey}`),
    'translated:adminUsersPage.statuses.pending'
  );
});

test('resolveAdminUserStatusLabel falls back to the raw value for an unknown status', () => {
  assert.equal(
    resolveAdminUserStatusLabel('suspended', (translationKey) => `translated:${translationKey}`),
    'suspended'
  );
});
