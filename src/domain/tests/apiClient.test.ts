import assert from 'node:assert/strict';
import test from 'node:test';
import { resolveSubmittedAt } from '../apiClient.ts';

test('resolveSubmittedAt returns the submission time reported by the backend', () => {
  assert.equal(resolveSubmittedAt({ submittedAt: '2026-05-11T10:30:00.000Z' }), '2026-05-11T10:30:00.000Z');
});

test('resolveSubmittedAt falls back to the current time when the backend does not report one', () => {
  const before = Date.now();
  const submittedAt = Date.parse(resolveSubmittedAt({ id: 'application-1' }));

  assert.ok(submittedAt >= before && submittedAt <= Date.now());
});
