import assert from 'node:assert/strict';
import test from 'node:test';
import type { VendorApplication } from '../../../../../domain/vendorApplications/vendorFormSubmission.ts';
import { buildStandAssignmentOptions } from '../utils/standAssignmentUtils.ts';
import { getBaseApplication } from './vendorApplicationFixture.ts';

const buildApplication = (overrides: Partial<VendorApplication>): VendorApplication => ({
  ...getBaseApplication(),
  ...overrides
});

const vendorStandIds = ['S1', 'S2', 'S10', 'P1'];

test('buildStandAssignmentOptions lists the vendor preferences first, in their order', () => {
  const application = buildApplication({ id: 'wooly', preferredStands: ['S10', 'S1', 'S10'] });
  const options = buildStandAssignmentOptions(application, [application], vendorStandIds);

  assert.deepEqual(options.preferredStands, [
    { preferenceOrder: 1, standId: 'S10', takenBy: null },
    { preferenceOrder: 2, standId: 'S1', takenBy: null }
  ]);
  assert.deepEqual(
    options.otherStands.map(({ standId }) => standId),
    ['S2', 'P1']
  );
});

test('buildStandAssignmentOptions marks stands already assigned to another application', () => {
  const application = buildApplication({ id: 'wooly', preferredStands: ['S1'], assignedStands: ['S2'] });
  const rival = buildApplication({ id: 'candle-lab', storeName: 'Candle Lab', assignedStands: ['S1'] });
  const options = buildStandAssignmentOptions(application, [application, rival], vendorStandIds);

  assert.equal(options.preferredStands[0].takenBy, 'Candle Lab');
  assert.equal(options.otherStands.find(({ standId }) => standId === 'S2')?.takenBy, null);
});

test('buildStandAssignmentOptions keeps a currently assigned stand that is missing from the hall plan', () => {
  const application = buildApplication({ id: 'legacy', preferredStands: [], assignedStands: ['X9'] });
  const options = buildStandAssignmentOptions(application, [application], vendorStandIds);

  assert.deepEqual(
    options.otherStands.map(({ standId }) => standId),
    ['S1', 'S2', 'S10', 'P1', 'X9']
  );
});
