import assert from 'node:assert/strict';
import test from 'node:test';
import { parseVendorApplications } from '../vendorsApplicationsApi.ts';

const createVendorApplicationPayload = () => ({
  allocatedStandId: null,
  allocationIteration: null,
  allocationState: 'none' as const,
  id: 'application-1',
  status: 'new' as const,
  submittedAt: '2026-05-11T10:30:00.000Z',
  storeName: 'Shop name',
  attendedBefore: true,
  mainCategory: 'yarns' as const,
  mainCategoryOther: '',
  preferredStands: ['P1'],
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

test('parseVendorApplications returns an empty list for invalid payloads', () => {
  assert.deepEqual(parseVendorApplications(null), []);
  assert.deepEqual(parseVendorApplications('not-a-list'), []);
  assert.deepEqual(parseVendorApplications({ foo: 'bar' }), []);
});

test('parseVendorApplications restores a valid payload', () => {
  const applications = [createVendorApplicationPayload()];

  assert.deepEqual(parseVendorApplications(applications), applications);
});

test('parseVendorApplications accepts a payload wrapped in an applications object', () => {
  const applications = [createVendorApplicationPayload()];

  assert.deepEqual(parseVendorApplications({ applications }), applications);
});

test('parseVendorApplications normalizes legacy values and defaults', () => {
  const legacyApplication = {
    ...createVendorApplicationPayload(),
    allocationState: undefined,
    allocatedStandId: undefined,
    allocationIteration: undefined,
    preferredStands: ['mgl60s92-lscpjj7', 'mgl65qbi-2kfiih9'],
    sponsorshipInterest: undefined,
    status: 'rejected' as const
  };

  const legacyFieldsWithoutOptionalValues = { ...legacyApplication };

  delete legacyFieldsWithoutOptionalValues.allocationState;
  delete legacyFieldsWithoutOptionalValues.allocatedStandId;
  delete legacyFieldsWithoutOptionalValues.allocationIteration;
  delete legacyFieldsWithoutOptionalValues.sponsorshipInterest;

  assert.deepEqual(parseVendorApplications([legacyFieldsWithoutOptionalValues]), [
    {
      ...legacyFieldsWithoutOptionalValues,
      allocatedStandId: null,
      allocationIteration: null,
      allocationState: 'none',
      preferredStands: ['P2', 'P3'],
      sponsorshipInterest: null,
      status: 'reserve'
    }
  ]);
});

test('parseVendorApplications keeps valid records when one record is malformed', () => {
  const validApplication = createVendorApplicationPayload();
  const malformedApplication = { id: 'broken-application' };

  assert.deepEqual(parseVendorApplications([validApplication, malformedApplication]), [validApplication]);
});
