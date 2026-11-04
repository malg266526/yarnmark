import assert from 'node:assert/strict';
import test from 'node:test';
import {
  addVendorToStand,
  applyStandPlanDraft,
  buildStandPlanVendorOptions,
  EMPTY_STAND_PLAN_DRAFT,
  getStandPlanChanges,
  getStandVendors,
  getUnassignedApplications,
  pruneStandPlanDraft,
  removeVendorFromStand
} from '../utils/standPlanUtils.ts';
import { getBaseApplication, withPreferredStands } from './vendorApplicationFixture.ts';

const base = getBaseApplication();
const applications = [
  { ...base, id: 'alpha', storeName: 'Alpha', assignedStands: ['S1'], ...withPreferredStands(['S1', 'S2']) },
  { ...base, id: 'beta', storeName: 'beta', ...withPreferredStands(['S3', 'S2']) },
  { ...base, id: 'gamma', storeName: 'Gamma', ...withPreferredStands(['S2']) },
  { ...base, id: 'rejected', storeName: 'Rejected', status: 'rejected' as const, ...withPreferredStands(['S2']) }
];

test('adding and removing vendors builds a draft on top of saved stands', () => {
  const withAlphaOnS2 = addVendorToStand(applications, EMPTY_STAND_PLAN_DRAFT, 'alpha', 'S2');

  assert.deepEqual(withAlphaOnS2, { alpha: ['S1', 'S2'] });
  assert.equal(addVendorToStand(applications, withAlphaOnS2, 'alpha', 'S2'), withAlphaOnS2);
  assert.deepEqual(removeVendorFromStand(applications, withAlphaOnS2, 'alpha', 'S1'), { alpha: ['S2'] });
  assert.deepEqual(removeVendorFromStand(applications, EMPTY_STAND_PLAN_DRAFT, 'beta', 'S1'), { beta: [] });
});

test('draft overrides saved stands only for touched applications', () => {
  const planned = applyStandPlanDraft(applications, { beta: ['S3'] });

  assert.deepEqual(
    planned.map(({ assignedStands }) => assignedStands),
    [['S1'], ['S3'], [], []]
  );
  assert.equal(planned[0], applications[0]);
});

test('changes ignore draft entries equal to saved stands regardless of order', () => {
  const savedPair = { ...applications[0], assignedStands: ['S1', 'S2'] };

  assert.deepEqual(
    getStandPlanChanges([savedPair, applications[1], applications[2]], {
      alpha: ['S2', 'S1'],
      beta: [],
      gamma: ['S2']
    }),
    [{ applicationId: 'gamma', standIds: ['S2'] }]
  );
});

test('vendor options put requesting vendors first by choice position and skip rejected or already placed', () => {
  const planned = applyStandPlanDraft(applications, { gamma: ['S2'] });

  assert.deepEqual(
    buildStandPlanVendorOptions(planned, 'S2').requestingVendors.map(({ applicationId }) => applicationId),
    ['alpha', 'beta']
  );
  assert.deepEqual(
    buildStandPlanVendorOptions(planned, 'S9').otherVendors.map(({ applicationId }) => applicationId),
    ['alpha', 'beta', 'gamma']
  );
});

test('stand vendors and unassigned vendors follow the planned stands', () => {
  const planned = applyStandPlanDraft(applications, { gamma: ['S1'] });

  assert.deepEqual(
    getStandVendors(planned, 'S1').map(({ applicationId }) => applicationId),
    ['alpha', 'gamma']
  );
  assert.deepEqual(
    getUnassignedApplications(planned).map(({ id }) => id),
    ['beta']
  );
});

test('pruning drops saved and unknown entries and keeps the draft identity when nothing changes', () => {
  const draft = { alpha: ['S1'], beta: ['S3'], missing: ['S9'] };
  const pendingOnly = { beta: ['S3'] };

  assert.deepEqual(pruneStandPlanDraft(applications, draft), pendingOnly);
  assert.equal(pruneStandPlanDraft(applications, pendingOnly), pendingOnly);
});
