import assert from 'node:assert/strict';
import test from 'node:test';
import { getEditionTitleOptions } from '../editionTitleUtils.ts';

test('getEditionTitleOptions selects the archive title with the past edition year in dormant mode', () => {
  assert.deepEqual(getEditionTitleOptions('dormant', 2026), { context: 'archive', year: 2026 });
});

test('getEditionTitleOptions selects the plain title in active mode', () => {
  assert.deepEqual(getEditionTitleOptions('active', 2026), {});
});
