import assert from 'node:assert/strict';
import test from 'node:test';
import type { VendorApplication } from '../../../../../domain/vendorApplications/vendorFormSubmission.ts';
import { groupApplicationsByStand } from '../utils/standGroupingUtils.ts';
import { getBaseApplication } from './vendorApplicationFixture.ts';

test('groupApplicationsByStand groups applications by selected stand and keeps declared priority', () => {
  const applications: VendorApplication[] = [
    {
      ...getBaseApplication(),
      id: 'application-1',
      status: 'considered',
      storeName: 'First Store',
      preferredStands: ['P2', 'P3', 'S1'],
      submittedAt: '2026-05-11T10:30:00.000Z'
    },
    {
      ...getBaseApplication(),
      id: 'application-2',
      status: 'new',
      storeName: 'Second Store',
      preferredStands: ['P2', 'M4', 'S6'],
      submittedAt: '2026-05-11T09:30:00.000Z'
    },
    {
      ...getBaseApplication(),
      id: 'application-3',
      status: 'accepted',
      storeName: 'Third Store',
      preferredStands: ['P3', 'S8', 'M2'],
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
