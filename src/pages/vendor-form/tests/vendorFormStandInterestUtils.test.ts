import assert from 'node:assert/strict';
import test from 'node:test';
import type { VendorApplication } from '../vendorFormSubmission.ts';
import { VENDOR_FORM_HIGH_INTEREST_MIN_REQUESTS } from '../vendorFormConstants.ts';
import {
  getHighInterestStandIds,
  getStandInterestCounts,
  isHighInterestStand
} from '../vendorFormStandInterestUtils.ts';

const createApplication = (id: string, preferredStands: string[]): VendorApplication => ({
  allocatedStandId: null,
  allocationIteration: null,
  allocationState: 'none',
  id,
  status: 'new',
  submittedAt: '2026-05-11T10:30:00.000Z',
  storeName: `Store ${id}`,
  attendedBefore: true,
  mainCategory: 'yarns',
  mainCategoryOther: '',
  preferredStands,
  interestedIfUnavailable: true,
  sponsorshipInterest: null,
  phoneNumber: '+48 123 456 789',
  email: `${id}@example.com`,
  invoiceDetails: 'Invoice details',
  logoFileName: 'logo.png',
  logoDataUrl: 'data:image/png;base64,AAAA',
  logoMimeType: 'image/png',
  businessDescription: 'Short business description',
  acceptedStatute: true
});

test('getStandInterestCounts counts each application once per stand', () => {
  const applications = [
    createApplication('1', ['P2', 'P3', 'P2']),
    createApplication('2', ['P2']),
    createApplication('3', ['P3'])
  ];

  const interestCounts = getStandInterestCounts(applications);

  assert.equal(interestCounts.get('P2'), 2);
  assert.equal(interestCounts.get('P3'), 2);
});

test('isHighInterestStand returns true from configured threshold', () => {
  assert.equal(isHighInterestStand(VENDOR_FORM_HIGH_INTEREST_MIN_REQUESTS - 1), false);
  assert.equal(isHighInterestStand(VENDOR_FORM_HIGH_INTEREST_MIN_REQUESTS), true);
});

test('getHighInterestStandIds returns only stands with at least three requests', () => {
  const applications = [
    createApplication('1', ['P2', 'P3']),
    createApplication('2', ['P2']),
    createApplication('3', ['P2', 'S1']),
    createApplication('4', ['P3'])
  ];

  assert.deepEqual(getHighInterestStandIds(applications), ['P2']);
});
