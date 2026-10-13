import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getMaxPreferredStands,
  getOpenPairStandId,
  getPreferredStandGroups,
  hasIncompleteStandPair,
  isEmailValid,
  isPhoneValid,
  toggleStandSelection
} from '../../../../domain/vendorApplications/vendorFormUtils.ts';
import { INITIAL_VENDOR_FORM_STATE } from '../../../../domain/vendorApplications/vendorFormTypes.ts';
import { createEmptyVendorFormDraft, parseStoredVendorFormDraft } from '../vendorFormStorage.ts';
import { collectVendorFormValidationErrors } from '../../../../domain/vendorApplications/vendorFormSchema.ts';

const createValidVendorFormState = () => ({
  ...INITIAL_VENDOR_FORM_STATE,
  storeName: 'Shop name',
  attendedBefore: true,
  mainCategory: 'yarns' as const,
  mainCategoryOther: '',
  preferredStands: [],
  interestedIfUnavailable: true,
  sponsorshipInterest: null,
  phoneNumber: '+48 123 456 789',
  email: 'vendor@example.com',
  invoiceDetails: 'Invoice details',
  logoFileName: 'logo.png',
  businessDescription: 'Short business description',
  acceptedStatute: true
});

test('isEmailValid accepts a valid email', () => {
  assert.equal(isEmailValid('vendor@example.com'), true);
});

test('isEmailValid rejects an invalid email', () => {
  assert.equal(isEmailValid('vendor.example.com'), false);
});

test('isPhoneValid accepts a formatted phone number', () => {
  assert.equal(isPhoneValid('+48 123 456 789'), true);
});

test('isPhoneValid rejects a too short phone number', () => {
  assert.equal(isPhoneValid('12345'), false);
});

test('parseStoredVendorFormDraft returns null for invalid payload', () => {
  assert.equal(parseStoredVendorFormDraft(null), null);
  assert.equal(parseStoredVendorFormDraft('not-json'), null);
  assert.equal(parseStoredVendorFormDraft(JSON.stringify({ foo: 'bar' })), null);
});

test('parseStoredVendorFormDraft restores a valid payload', () => {
  const draft = {
    formData: {
      ...createValidVendorFormState(),
      preferredStands: ['stand-1', 'stand-2'],
      interestedIfUnavailable: false,
      sponsorshipInterest: true
    },
    isComplete: true
  };

  assert.deepEqual(parseStoredVendorFormDraft(JSON.stringify(draft)), draft);
});

test('parseStoredVendorFormDraft normalizes stored hall ids to readable stand ids', () => {
  const draft = {
    formData: {
      ...createValidVendorFormState(),
      preferredStands: ['mgl60s92-lscpjj7', 'mgl65qbi-2kfiih9']
    },
    isComplete: false
  };

  assert.deepEqual(parseStoredVendorFormDraft(JSON.stringify(draft)), {
    formData: {
      ...draft.formData,
      preferredStands: ['P2', 'P3']
    },
    isComplete: false
  });
});

test('parseStoredVendorFormDraft rejects a payload missing preferredStands', () => {
  const draft = {
    formData: {
      storeName: 'Shop name',
      attendedBefore: true,
      mainCategory: 'yarns' as const,
      mainCategoryOther: '',
      interestedIfUnavailable: false,
      sponsorshipInterest: true,
      phoneNumber: '+48 123 456 789',
      email: 'vendor@example.com',
      invoiceDetails: 'Invoice details',
      logoFileName: 'logo.png',
      businessDescription: 'Short business description',
      acceptedStatute: true
    },
    isComplete: true
  };

  assert.equal(parseStoredVendorFormDraft(JSON.stringify(draft)), null);
});

test('parseStoredVendorFormDraft restores legacy payload without sponsorship interest as null', () => {
  const legacyDraft = {
    formData: {
      ...createValidVendorFormState(),
      preferredStands: ['P1'],
      sponsorshipInterest: undefined
    },
    isComplete: false
  };

  const legacyFormData = { ...legacyDraft.formData };

  delete legacyFormData.sponsorshipInterest;

  assert.deepEqual(parseStoredVendorFormDraft(JSON.stringify({ formData: legacyFormData, isComplete: false })), {
    formData: {
      ...legacyFormData,
      sponsorshipInterest: null
    },
    isComplete: false
  });
});

test('createEmptyVendorFormDraft returns empty initial state', () => {
  assert.deepEqual(createEmptyVendorFormDraft(), {
    formData: INITIAL_VENDOR_FORM_STATE,
    isComplete: false
  });
});

test('collectVendorFormValidationErrors returns multiple missing-section errors at once', () => {
  assert.deepEqual(collectVendorFormValidationErrors(INITIAL_VENDOR_FORM_STATE), {
    storeName: 'vendorsFormPage.validation.storeNameRequired',
    attendedBefore: 'vendorsFormPage.validation.attendedBeforeRequired',
    mainCategory: 'vendorsFormPage.validation.mainCategoryRequired',
    preferredStands: 'vendorsFormPage.validation.preferredStandsRequired',
    interestedIfUnavailable: 'vendorsFormPage.validation.interestedIfUnavailableRequired',
    phoneNumber: 'vendorsFormPage.validation.phoneRequired',
    email: 'vendorsFormPage.validation.emailRequired',
    invoiceDetails: 'vendorsFormPage.validation.invoiceDetailsRequired',
    logoFileName: 'vendorsFormPage.validation.logoRequired',
    businessDescription: 'vendorsFormPage.validation.businessDescriptionRequired',
    acceptedStatute: 'vendorsFormPage.validation.statuteRequired'
  });
});

test('toggleStandSelection adds a stand when under the cap', () => {
  assert.deepEqual(toggleStandSelection(['a'], 'b', 3), ['a', 'b']);
});

test('toggleStandSelection removes a stand that is already selected', () => {
  assert.deepEqual(toggleStandSelection(['a', 'b', 'c'], 'b', 3), ['a', 'c']);
});

test('toggleStandSelection refuses to add when at the cap', () => {
  const current = ['a', 'b', 'c'];

  assert.equal(toggleStandSelection(current, 'd', 3), current);
});

test('toggleStandSelection still allows removal when at the cap', () => {
  assert.deepEqual(toggleStandSelection(['a', 'b', 'c'], 'a', 3), ['b', 'c']);
});

test('getMaxPreferredStands doubles the cap when the vendor wants two stands', () => {
  assert.equal(getMaxPreferredStands(false), 3);
  assert.equal(getMaxPreferredStands(true), 6);
});

test('getPreferredStandGroups keeps single stands as one-element preferences', () => {
  assert.deepEqual(getPreferredStandGroups(['S1', 'S2', 'S3'], false), [['S1'], ['S2'], ['S3']]);
});

test('getPreferredStandGroups pairs stands in selection order', () => {
  assert.deepEqual(getPreferredStandGroups(['S1', 'S2', 'M4', 'M5'], true), [
    ['S1', 'S2'],
    ['M4', 'M5']
  ]);
});

test('getPreferredStandGroups leaves a half-finished pair as its own group', () => {
  assert.deepEqual(getPreferredStandGroups(['S1', 'S2', 'M4'], true), [['S1', 'S2'], ['M4']]);
});

test('hasIncompleteStandPair only reports an odd count when pairs are requested', () => {
  assert.equal(hasIncompleteStandPair(['S1', 'S2', 'M4'], true), true);
  assert.equal(hasIncompleteStandPair(['S1', 'S2'], true), false);
  assert.equal(hasIncompleteStandPair(['S1', 'S2', 'M4'], false), false);
  assert.equal(hasIncompleteStandPair([], true), false);
});

test('parseStoredVendorFormDraft reads a draft saved before the two-stands checkbox existed', () => {
  const legacyFormData: Record<string, unknown> = { ...createValidVendorFormState(), preferredStands: ['S1'] };

  delete legacyFormData.wantsTwoStands;

  const draft = parseStoredVendorFormDraft(JSON.stringify({ formData: legacyFormData, isComplete: false }));

  assert.equal(draft?.formData.wantsTwoStands, false);
});

test('collectVendorFormValidationErrors rejects a half-finished pair of stands', () => {
  const errors = collectVendorFormValidationErrors({
    ...createValidVendorFormState(),
    wantsTwoStands: true,
    preferredStands: ['S1', 'S2', 'M4']
  });

  assert.equal(errors.preferredStands, 'vendorsFormPage.validation.standPairIncomplete');
});

test('collectVendorFormValidationErrors accepts complete pairs of stands', () => {
  const errors = collectVendorFormValidationErrors({
    ...createValidVendorFormState(),
    wantsTwoStands: true,
    preferredStands: ['S1', 'S2', 'M4', 'M5']
  });

  assert.equal(errors.preferredStands, undefined);
});

test('getOpenPairStandId points at the stand still waiting for its neighbour', () => {
  assert.equal(getOpenPairStandId(['S1', 'S2', 'M4'], true), 'M4');
});

test('getOpenPairStandId returns nothing when every pair is complete or pairs are off', () => {
  assert.equal(getOpenPairStandId(['S1', 'S2'], true), null);
  assert.equal(getOpenPairStandId([], true), null);
  assert.equal(getOpenPairStandId(['S1'], false), null);
});
