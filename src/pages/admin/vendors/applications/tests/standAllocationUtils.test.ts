import assert from 'node:assert/strict';
import test from 'node:test';
import type { VendorApplication } from '../../../../../domain/vendorApplications/vendorFormSubmission.ts';
import {
  getAcceptedApplicationsSortedBySubmittedAt,
  sortApplicationsBySubmittedAt
} from '../utils/standAllocationUtils.ts';
import { getBaseApplication } from './vendorApplicationFixture.ts';

test('sortApplicationsBySubmittedAt returns earliest submissions first', () => {
  const applications: VendorApplication[] = [
    {
      ...getBaseApplication(),
      id: 'application-2',
      submittedAt: '2026-05-11T12:00:00.000Z'
    },
    {
      ...getBaseApplication(),
      id: 'application-1',
      submittedAt: '2026-05-11T09:00:00.000Z'
    }
  ];

  assert.deepEqual(
    sortApplicationsBySubmittedAt(applications).map((application) => application.id),
    ['application-1', 'application-2']
  );
});

test('getAcceptedApplicationsSortedBySubmittedAt keeps only accepted applications and sorts them oldest-first', () => {
  const applications: VendorApplication[] = [
    {
      ...getBaseApplication(),
      id: 'application-3',
      status: 'accepted',
      storeName: 'Third Store',
      submittedAt: '2026-05-11T12:00:00.000Z'
    },
    {
      ...getBaseApplication(),
      id: 'application-1',
      status: 'rejected',
      storeName: 'First Store',
      submittedAt: '2026-05-11T08:00:00.000Z'
    },
    {
      ...getBaseApplication(),
      id: 'application-2',
      status: 'accepted',
      storeName: 'Second Store',
      submittedAt: '2026-05-11T09:00:00.000Z'
    }
  ];

  assert.deepEqual(
    getAcceptedApplicationsSortedBySubmittedAt(applications).map((application) => application.id),
    ['application-2', 'application-3']
  );
});
