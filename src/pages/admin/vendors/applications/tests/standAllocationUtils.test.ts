import assert from 'node:assert/strict';
import test from 'node:test';
import type { VendorApplication } from '../../../../../domain/vendorApplications/vendorFormSubmission.ts';
import {
  getAcceptedApplicationsSortedBySubmittedAt,
  getCascadeChoiceReservations,
  getCascadeManualNegotiationReservations,
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
      status: 'considered',
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

test('getCascadeChoiceReservations falls back through first, second and third-choice stands', () => {
  const applications: VendorApplication[] = [
    {
      ...getBaseApplication(),
      id: 'application-1',
      status: 'accepted',
      storeName: 'First Store',
      preferredStands: ['P2', 'P3', 'S1'],
      submittedAt: '2026-05-11T08:00:00.000Z'
    },
    {
      ...getBaseApplication(),
      id: 'application-2',
      status: 'accepted',
      storeName: 'Second Store',
      preferredStands: ['P2', 'P3', 'S6'],
      submittedAt: '2026-05-11T09:00:00.000Z'
    },
    {
      ...getBaseApplication(),
      id: 'application-3',
      status: 'accepted',
      storeName: 'Third Store',
      preferredStands: ['S1', 'S8', 'M2'],
      submittedAt: '2026-05-11T10:00:00.000Z'
    },
    {
      ...getBaseApplication(),
      id: 'application-4',
      status: 'considered',
      storeName: 'Ignored Store',
      preferredStands: ['S9', 'S10', 'S11'],
      submittedAt: '2026-05-11T07:00:00.000Z'
    }
  ];

  assert.deepEqual(
    getCascadeChoiceReservations(applications).map(({ application, reservedStandId }) => ({
      applicationId: application.id,
      reservedStandId
    })),
    [
      { applicationId: 'application-1', reservedStandId: 'P2' },
      { applicationId: 'application-2', reservedStandId: 'P3' },
      { applicationId: 'application-3', reservedStandId: 'S1' }
    ]
  );
});

test('getCascadeManualNegotiationReservations returns accepted applications without any free preferred stand', () => {
  const applications: VendorApplication[] = [
    {
      ...getBaseApplication(),
      id: 'application-1',
      status: 'accepted',
      storeName: 'First Store',
      preferredStands: ['P2', 'P3', 'S1'],
      submittedAt: '2026-05-11T08:00:00.000Z'
    },
    {
      ...getBaseApplication(),
      id: 'application-2',
      status: 'accepted',
      storeName: 'Second Store',
      preferredStands: ['P2', 'P3', 'S1'],
      submittedAt: '2026-05-11T09:00:00.000Z'
    },
    {
      ...getBaseApplication(),
      id: 'application-3',
      status: 'accepted',
      storeName: 'Third Store',
      preferredStands: ['S1', 'S8', 'M2'],
      submittedAt: '2026-05-11T10:00:00.000Z'
    },
    {
      ...getBaseApplication(),
      id: 'application-4',
      status: 'accepted',
      storeName: 'Fourth Store',
      preferredStands: ['P2', 'P3', 'S1'],
      submittedAt: '2026-05-11T11:00:00.000Z'
    }
  ];

  assert.deepEqual(
    getCascadeManualNegotiationReservations(applications).map(({ application }) => application.id),
    ['application-4']
  );
});
