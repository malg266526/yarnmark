import assert from 'node:assert/strict';
import test from 'node:test';
import type { VendorApplication } from '../../../../../domain/vendorApplications/vendorFormSubmission.ts';
import {
  buildStandAssignmentOptions,
  fromStandAssignmentValue,
  toStandAssignmentValue
} from '../utils/standAssignmentUtils.ts';
import { getBaseApplication, withPreferredStands } from './vendorApplicationFixture.ts';

const buildApplication = (overrides: Partial<VendorApplication>): VendorApplication => ({
  ...getBaseApplication(),
  ...overrides
});

const vendorStandIds = ['S1', 'S2', 'S10', 'P1'];

test('buildStandAssignmentOptions lists the vendor preferences first, in their order', () => {
  const application = buildApplication({ id: 'wooly', ...withPreferredStands(['S10', 'S1', 'S10']) });
  const options = buildStandAssignmentOptions(application, [application], vendorStandIds);

  assert.deepEqual(options.preferredStands, [
    { preferenceOrder: 1, standIds: ['S10'], assignedVendors: [] },
    { preferenceOrder: 2, standIds: ['S1'], assignedVendors: [] }
  ]);
  assert.deepEqual(
    options.otherStands.map(({ standIds }) => standIds),
    [['S2'], ['P1']]
  );
});

test('buildStandAssignmentOptions retains every co-exhibitor by identity on shared stands', () => {
  const application = buildApplication({ id: 'wooly', ...withPreferredStands(['S1']), assignedStands: ['S2'] });
  const first = buildApplication({ id: 'first', storeName: 'Shop', assignedStands: ['S1', 'S1', 'S2'] });
  const second = buildApplication({ id: 'second', storeName: 'Shop', assignedStands: ['S1', 'P1'] });
  const options = buildStandAssignmentOptions(application, [application, first, second], vendorStandIds);

  assert.deepEqual(options.preferredStands[0].assignedVendors, [
    { id: 'first', storeName: 'Shop' },
    { id: 'second', storeName: 'Shop' }
  ]);
  assert.deepEqual(options.otherStands.find(({ standIds }) => standIds[0] === 'S2')?.assignedVendors, [
    { id: 'first', storeName: 'Shop' }
  ]);
  assert.deepEqual(options.otherStands.find(({ standIds }) => standIds[0] === 'S10')?.assignedVendors, []);
});

test('buildStandAssignmentOptions keeps a currently assigned stand that is missing from the hall plan', () => {
  const application = buildApplication({ id: 'legacy', ...withPreferredStands([]), assignedStands: ['X9'] });
  const options = buildStandAssignmentOptions(application, [application], vendorStandIds);

  assert.deepEqual(
    options.otherStands.map(({ standIds }) => standIds[0]),
    ['S1', 'S2', 'S10', 'P1', 'X9']
  );
});

test('buildStandAssignmentOptions offers a preferred pair as one option and keeps its stands among the others', () => {
  const application = buildApplication({
    id: 'mixed',
    preferredStandGroups: [['S1', 'S2'], ['P1']],
    preferredStands: ['S1', 'S2', 'P1']
  });
  const sharing = buildApplication({ id: 'sharing', storeName: 'Shop', assignedStands: ['S1', 'S2'] });
  const options = buildStandAssignmentOptions(application, [application, sharing], vendorStandIds);

  assert.deepEqual(options.preferredStands, [
    { preferenceOrder: 1, standIds: ['S1', 'S2'], assignedVendors: [{ id: 'sharing', storeName: 'Shop' }] },
    { preferenceOrder: 2, standIds: ['P1'], assignedVendors: [] }
  ]);
  assert.deepEqual(
    options.otherStands.map(({ standIds }) => standIds[0]),
    ['S1', 'S2', 'S10']
  );
});

test('a stand assignment value carries every stand of the chosen option', () => {
  assert.equal(toStandAssignmentValue(['S1', 'S2']), 'S1,S2');
  assert.deepEqual(fromStandAssignmentValue('S1,S2'), ['S1', 'S2']);
  assert.deepEqual(fromStandAssignmentValue(''), []);
});
