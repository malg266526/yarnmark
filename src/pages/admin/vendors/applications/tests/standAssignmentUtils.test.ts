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
    { preferenceOrder: 1, standId: 'S10', assignedVendors: [] },
    { preferenceOrder: 2, standId: 'S1', assignedVendors: [] }
  ]);
  assert.deepEqual(
    options.otherStands.map(({ standId }) => standId),
    ['S2', 'P1']
  );
});

test('buildStandAssignmentOptions retains every co-exhibitor by identity on shared stands', () => {
  const application = buildApplication({ id: 'wooly', preferredStands: ['S1'], assignedStands: ['S2'] });
  const first = buildApplication({ id: 'first', storeName: 'Shop', assignedStands: ['S1', 'S1', 'S2'] });
  const second = buildApplication({ id: 'second', storeName: 'Shop', assignedStands: ['S1', 'P1'] });
  const options = buildStandAssignmentOptions(application, [application, first, second], vendorStandIds);

  assert.deepEqual(options.preferredStands[0].assignedVendors, [
    { id: 'first', storeName: 'Shop' },
    { id: 'second', storeName: 'Shop' }
  ]);
  assert.deepEqual(options.otherStands.find(({ standId }) => standId === 'S2')?.assignedVendors, [
    { id: 'first', storeName: 'Shop' }
  ]);
  assert.deepEqual(options.otherStands.find(({ standId }) => standId === 'S10')?.assignedVendors, []);
});

test('buildStandAssignmentOptions keeps a currently assigned stand that is missing from the hall plan', () => {
  const application = buildApplication({ id: 'legacy', preferredStands: [], assignedStands: ['X9'] });
  const options = buildStandAssignmentOptions(application, [application], vendorStandIds);

  assert.deepEqual(
    options.otherStands.map(({ standId }) => standId),
    ['S1', 'S2', 'S10', 'P1', 'X9']
  );
});
