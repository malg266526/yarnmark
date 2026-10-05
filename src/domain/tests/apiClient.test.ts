import assert from 'node:assert/strict';
import test from 'node:test';
import { resolveApiAssetUrl, resolveSubmittedAt } from '../apiClient.ts';

test('resolveSubmittedAt returns the submission time reported by the backend', () => {
  assert.equal(resolveSubmittedAt({ submittedAt: '2026-05-11T10:30:00.000Z' }), '2026-05-11T10:30:00.000Z');
});

test('resolveSubmittedAt falls back to the current time when the backend does not report one', () => {
  const before = Date.now();
  const submittedAt = Date.parse(resolveSubmittedAt({ id: 'application-1' }));

  assert.ok(submittedAt >= before && submittedAt <= Date.now());
});

test('resolveApiAssetUrl adds the API origin to an asset path', () => {
  assert.equal(resolveApiAssetUrl('/uploads/vendors/logo.webp'), 'https://yarnmark-api.com/uploads/vendors/logo.webp');
  assert.equal(
    resolveApiAssetUrl('uploads/workshops/logo.webp'),
    'https://yarnmark-api.com/uploads/workshops/logo.webp'
  );
});

test('resolveApiAssetUrl returns null when the asset path is missing', () => {
  assert.equal(resolveApiAssetUrl(null), null);
  assert.equal(resolveApiAssetUrl(undefined), null);
  assert.equal(resolveApiAssetUrl('  '), null);
});
