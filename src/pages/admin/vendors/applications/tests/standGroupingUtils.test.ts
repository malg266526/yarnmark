import assert from 'node:assert/strict';
import test from 'node:test';
import type { VendorApplication } from '../../../../../domain/vendorApplications/vendorFormSubmission.ts';
import { groupApplicationsByStand } from '../utils/standGroupingUtils.ts';
import { getBaseApplication, withPreferredStands } from './vendorApplicationFixture.ts';

test('groupApplicationsByStand groups applications by selected stand and keeps declared priority', () => {
  const applications: VendorApplication[] = [
    {
      ...getBaseApplication(),
      id: 'application-1',
      status: 'rejected',
      storeName: 'First Store',
      ...withPreferredStands(['P2', 'P3', 'S1']),
      submittedAt: '2026-05-11T10:30:00.000Z'
    },
    {
      ...getBaseApplication(),
      id: 'application-2',
      status: 'pending',
      storeName: 'Second Store',
      ...withPreferredStands(['P2', 'M4', 'S6']),
      submittedAt: '2026-05-11T09:30:00.000Z'
    },
    {
      ...getBaseApplication(),
      id: 'application-3',
      status: 'accepted',
      storeName: 'Third Store',
      ...withPreferredStands(['P3', 'S8', 'M2']),
      submittedAt: '2026-05-11T08:30:00.000Z'
    }
  ];

  const standGroups = groupApplicationsByStand(applications);
  const premiumStandTwo = standGroups.find(({ standId }) => standId === 'P2');
  const premiumStandThree = standGroups.find(({ standId }) => standId === 'P3');

  assert.deepEqual(
    premiumStandTwo?.requests.map(({ applicationId, priority }) => ({ applicationId, priority })),
    [
      { applicationId: 'application-2', priority: 'highest' },
      { applicationId: 'application-1', priority: 'highest' }
    ]
  );
  assert.deepEqual(
    premiumStandThree?.requests.map(({ applicationId, priority }) => ({ applicationId, priority })),
    [
      { applicationId: 'application-3', priority: 'highest' },
      { applicationId: 'application-1', priority: 'medium' }
    ]
  );
});

test('groupApplicationsByStand gives both stands of a pair the priority of that pair', () => {
  const groups = groupApplicationsByStand([
    { ...getBaseApplication(), id: 'pairs', ...withPreferredStands(['S1', 'S2', 'M4', 'M5'], true) }
  ]);

  assert.deepEqual(
    groups.map(({ standId, requests }) => [standId, requests[0]?.priority]),
    [
      ['M4', 'medium'],
      ['M5', 'medium'],
      ['S1', 'highest'],
      ['S2', 'highest']
    ]
  );
});

test('groupApplicationsByStand shows the whole pair on the lists of both its stands', () => {
  const standGroups = groupApplicationsByStand([
    { ...getBaseApplication(), id: 'mixed', preferredStandGroups: [['P1'], ['S1', 'S2']] }
  ]);

  assert.deepEqual(
    standGroups.map(({ standId, requests }) => ({
      standId,
      requests: requests.map(({ pairStandIds, priority }) => ({ pairStandIds, priority }))
    })),
    [
      { standId: 'P1', requests: [{ pairStandIds: [], priority: 'highest' }] },
      { standId: 'S1', requests: [{ pairStandIds: ['S1', 'S2'], priority: 'medium' }] },
      { standId: 'S2', requests: [{ pairStandIds: ['S1', 'S2'], priority: 'medium' }] }
    ]
  );
});
