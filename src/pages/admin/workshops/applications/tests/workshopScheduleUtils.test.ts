import assert from 'node:assert/strict';
import test from 'node:test';
import { buildWorkshopApplicationWarnings } from '../utils/workshopScheduleUtils.ts';
import { createWorkshopApplicationFixture } from './workshopApplicationFixture.ts';

test('warnings report a missing contract and accept a provided contract', () => {
  const missing = createWorkshopApplicationFixture({ contractType: null });
  const provided = createWorkshopApplicationFixture({ id: 'provided', contractType: 'invoice' });
  const warnings = buildWorkshopApplicationWarnings([missing, provided]);

  assert.deepEqual(warnings.get(missing.id), ['missingContract']);
  assert.deepEqual(warnings.get(provided.id), []);
});
