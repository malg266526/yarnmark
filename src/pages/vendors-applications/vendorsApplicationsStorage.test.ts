import assert from 'node:assert/strict';
import test from 'node:test';
import { mergeStoredVendorApplicationsWithMocks, parseStoredVendorApplications } from './vendorsApplicationsStorage.ts';

const createStoredVendorApplicationPayload = () => ({
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

test('parseStoredVendorApplications returns an empty list for invalid payloads', () => {
  assert.deepEqual(parseStoredVendorApplications(null), []);
  assert.deepEqual(parseStoredVendorApplications('not-json'), []);
  assert.deepEqual(parseStoredVendorApplications(JSON.stringify({ foo: 'bar' })), []);
});

test('parseStoredVendorApplications restores a valid payload', () => {
  const applications = [createStoredVendorApplicationPayload()];

  assert.deepEqual(parseStoredVendorApplications(JSON.stringify(applications)), applications);
});

test('parseStoredVendorApplications normalizes legacy values and defaults', () => {
  const legacyApplication = {
    ...createStoredVendorApplicationPayload(),
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

  assert.deepEqual(parseStoredVendorApplications(JSON.stringify([legacyFieldsWithoutOptionalValues])), [
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

test('parseStoredVendorApplications keeps valid records when one record is malformed', () => {
  const validApplication = createStoredVendorApplicationPayload();
  const malformedApplication = { id: 'broken-application' };

  assert.deepEqual(parseStoredVendorApplications(JSON.stringify([validApplication, malformedApplication])), [
    validApplication
  ]);
});

test('mergeStoredVendorApplicationsWithMocks keeps stored records and appends missing mocks', () => {
  const storedApplication = {
    ...createStoredVendorApplicationPayload(),
    id: 'application-1',
    storeName: 'Stored name'
  };
  const storedOnlyApplication = {
    ...createStoredVendorApplicationPayload(),
    id: 'application-3',
    storeName: 'Stored only'
  };
  const mockApplications = [
    {
      ...createStoredVendorApplicationPayload(),
      id: 'application-1',
      storeName: 'Mock name'
    },
    {
      ...createStoredVendorApplicationPayload(),
      id: 'application-2',
      storeName: 'Second mock'
    }
  ];

  assert.deepEqual(
    mergeStoredVendorApplicationsWithMocks([storedApplication, storedOnlyApplication], mockApplications).map(
      (application) => ({
        id: application.id,
        storeName: application.storeName
      })
    ),
    [
      { id: 'application-1', storeName: 'Stored name' },
      { id: 'application-2', storeName: 'Second mock' },
      { id: 'application-3', storeName: 'Stored only' }
    ]
  );
});
