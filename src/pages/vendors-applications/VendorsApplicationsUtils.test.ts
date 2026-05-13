import assert from 'node:assert/strict';
import test from 'node:test';
import type { VendorApplication } from '../vendor-form/vendorFormSubmission.ts';
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
  allocatedStandId: null,
  allocationIteration: null,
  allocationState: 'none',
  id: 'application-1',
  status: 'new',
  submittedAt: '2026-05-11T10:30:00.000Z',
  storeName: 'Shop name',
  attendedBefore: true,
  mainCategory: 'yarns',
  mainCategoryOther: '',
  preferredStands: ['A1'],
  interestedIfUnavailable: false,
  sponsorshipInterest: null,
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

test('status order is stable for admin controls', () => {
  assert.deepEqual(VENDOR_APPLICATION_STATUS_ORDER, ['new', 'considered', 'accepted', 'reserve']);
});

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
