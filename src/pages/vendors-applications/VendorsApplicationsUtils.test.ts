import assert from 'node:assert/strict';
import test from 'node:test';
import type { VendorApplication } from '../vendors-form/vendorsFormSubmission.ts';
import {
  formatBoolean,
  formatDateTime,
  formatMainCategory,
  groupApplicationsByStand,
  sortApplicationsBySubmittedAt,
  VENDOR_APPLICATION_STATUS_ORDER
} from './VendorsApplicationsUtils.ts';

const BOOLEAN_LABELS = {
  no: 'No',
  noAnswer: 'No answer',
  yes: 'Yes'
} as const;

const getBaseApplication = (): VendorApplication => ({
  id: 'application-1',
  status: 'new',
  submittedAt: '2026-05-11T10:30:00.000Z',
  storeName: 'Shop name',
  attendedBefore: true,
  mainCategory: 'yarns',
  mainCategoryOther: '',
  preferredStands: ['A1'],
  interestedIfUnavailable: false,
  phoneNumber: '+48 123 456 789',
  email: 'vendor@example.com',
  invoiceDetails: 'Invoice details',
  logoFileName: 'logo.png',
  logoDataUrl: 'data:image/png;base64,AAAA',
  logoMimeType: 'image/png',
  businessDescription: 'Short business description',
  acceptedStatute: true
});

test('formatBoolean returns no-answer label for null', () => {
  assert.equal(formatBoolean(null, BOOLEAN_LABELS), 'No answer');
});

test('formatBoolean returns yes/no labels for booleans', () => {
  assert.equal(formatBoolean(true, BOOLEAN_LABELS), 'Yes');
  assert.equal(formatBoolean(false, BOOLEAN_LABELS), 'No');
});

test('formatMainCategory returns translated category for standard values', () => {
  const application = getBaseApplication();

  assert.equal(
    formatMainCategory(application, (key) => `category:${key}`, 'Not provided'),
    'category:yarns'
  );
});

test('formatMainCategory returns custom value for other category', () => {
  const application = {
    ...getBaseApplication(),
    mainCategory: 'other' as const,
    mainCategoryOther: 'Buttons'
  };

  assert.equal(
    formatMainCategory(application, (key) => `category:${key}`, 'Not provided'),
    'Buttons'
  );
});

test('formatMainCategory falls back to not-provided label', () => {
  const missingCategoryApplication = {
    ...getBaseApplication(),
    mainCategory: null,
    mainCategoryOther: ''
  };
  const otherWithoutValueApplication = {
    ...getBaseApplication(),
    mainCategory: 'other' as const,
    mainCategoryOther: ''
  };

  assert.equal(
    formatMainCategory(missingCategoryApplication, (key) => `category:${key}`, 'Not provided'),
    'Not provided'
  );
  assert.equal(
    formatMainCategory(otherWithoutValueApplication, (key) => `category:${key}`, 'Not provided'),
    'Not provided'
  );
});

test('formatDateTime formats ISO timestamp for locale', () => {
  assert.equal(formatDateTime('2026-05-11T10:30:00.000Z', 'en-US'), 'May 11, 2026 at 12:30:00 PM');
});

test('groupApplicationsByStand groups stands and orders requests by submission date', () => {
  const applications: VendorApplication[] = [
    {
      ...getBaseApplication(),
      id: 'application-1',
      storeName: 'First Store',
      submittedAt: '2026-05-11T12:00:00.000Z',
      preferredStands: ['S2', 'P1', 'M1']
    },
    {
      ...getBaseApplication(),
      id: 'application-2',
      storeName: 'Second Store',
      submittedAt: '2026-05-11T10:00:00.000Z',
      preferredStands: ['P1', 'S2']
    }
  ];

  assert.deepEqual(groupApplicationsByStand(applications), [
    {
      standId: 'M1',
      requests: [
        {
          applicationId: 'application-1',
          priority: 'lowest',
          storeName: 'First Store',
          submittedAt: '2026-05-11T12:00:00.000Z'
        }
      ]
    },
    {
      standId: 'P1',
      requests: [
        {
          applicationId: 'application-2',
          priority: 'highest',
          storeName: 'Second Store',
          submittedAt: '2026-05-11T10:00:00.000Z'
        },
        {
          applicationId: 'application-1',
          priority: 'medium',
          storeName: 'First Store',
          submittedAt: '2026-05-11T12:00:00.000Z'
        }
      ]
    },
    {
      standId: 'S2',
      requests: [
        {
          applicationId: 'application-2',
          priority: 'medium',
          storeName: 'Second Store',
          submittedAt: '2026-05-11T10:00:00.000Z'
        },
        {
          applicationId: 'application-1',
          priority: 'highest',
          storeName: 'First Store',
          submittedAt: '2026-05-11T12:00:00.000Z'
        }
      ]
    }
  ]);
});

test('status order is stable for admin controls', () => {
  assert.deepEqual(VENDOR_APPLICATION_STATUS_ORDER, ['new', 'considered', 'accepted', 'rejected']);
});

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
