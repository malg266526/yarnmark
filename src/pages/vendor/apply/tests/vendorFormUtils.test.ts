import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getActivePairingStandId,
  getPreferredStandGroups,
  getSelectedStandIds,
  hasStandPair,
  isEmailValid,
  isPhoneValid,
  removeSecondStand,
  toggleStandOption
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
  preferredStandGroups: [],
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
      preferredStandGroups: [['stand-1', 'stand-2'], ['stand-3']],
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
      preferredStandGroups: [['mgl60s92-lscpjj7', 'mgl65qbi-2kfiih9']]
    },
    isComplete: false
  };

  assert.deepEqual(parseStoredVendorFormDraft(JSON.stringify(draft)), {
    formData: {
      ...draft.formData,
      preferredStandGroups: [['P2', 'P3']]
    },
    isComplete: false
  });
});

test('parseStoredVendorFormDraft restores a draft with the old flat stand list without its stands', () => {
  const draft = {
    formData: {
      preferredStands: ['S1', 'S2'],
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

  const restoredDraft = parseStoredVendorFormDraft(JSON.stringify(draft));

  assert.deepEqual(restoredDraft?.formData.preferredStandGroups, []);
  assert.equal(restoredDraft?.formData.storeName, 'Shop name');
});

test('parseStoredVendorFormDraft restores legacy payload without sponsorship interest as null', () => {
  const legacyDraft = {
    formData: {
      ...createValidVendorFormState(),
      preferredStandGroups: [['P1']],
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
    preferredStandGroups: 'vendorsFormPage.validation.preferredStandsRequired',
    interestedIfUnavailable: 'vendorsFormPage.validation.interestedIfUnavailableRequired',
    phoneNumber: 'vendorsFormPage.validation.phoneRequired',
    email: 'vendorsFormPage.validation.emailRequired',
    invoiceDetails: 'vendorsFormPage.validation.invoiceDetailsRequired',
    logoFileName: 'vendorsFormPage.validation.logoRequired',
    businessDescription: 'vendorsFormPage.validation.businessDescriptionRequired',
    acceptedStatute: 'vendorsFormPage.validation.statuteRequired'
  });
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

test('parseStoredVendorFormDraft drops the fields of the removed two-stands checkbox from an old draft', () => {
  const legacyFormData = {
    ...createValidVendorFormState(),
    preferredStandGroups: [['S1']],
    wantsTwoStands: true,
    pairAnchorStandId: 'S2'
  };

  const draft = parseStoredVendorFormDraft(JSON.stringify({ formData: legacyFormData, isComplete: false }));

  assert.deepEqual(draft?.formData.preferredStandGroups, [['S1']]);
  assert.equal(draft && 'wantsTwoStands' in draft.formData, false);
  assert.equal(draft && 'pairAnchorStandId' in draft.formData, false);
});

test('collectVendorFormValidationErrors accepts a mix of pairs and single stands', () => {
  const errors = collectVendorFormValidationErrors({
    ...createValidVendorFormState(),
    preferredStandGroups: [['S1', 'S2'], ['P1'], ['S6']]
  });

  assert.equal(errors.preferredStandGroups, undefined);
});

const pickStands = (standIds: string[]) =>
  standIds.reduce<string[][]>((standGroups, standId) => toggleStandOption(standGroups, standId, null), []);

test('toggleStandOption adds every clicked stand as its own option in click order', () => {
  assert.deepEqual(pickStands(['S1', 'P1', 'S6']), [['S1'], ['P1'], ['S6']]);
});

test('toggleStandOption pairs the clicked stand with the option waiting for a second stand', () => {
  assert.deepEqual(toggleStandOption([['S1'], ['P1'], ['S6']], 'S2', 'S1'), [['S1', 'S2'], ['P1'], ['S6']]);
});

test('toggleStandOption adds a second stand even when all options are taken', () => {
  assert.deepEqual(toggleStandOption([['S1'], ['P1'], ['S6']], 'S7', 'S6'), [['S1'], ['P1'], ['S6', 'S7']]);
});

test('toggleStandOption ignores a pairing stand that is no longer a single option', () => {
  assert.deepEqual(toggleStandOption([['S1', 'S2']], 'P1', 'S1'), [['S1', 'S2'], ['P1']]);
  assert.deepEqual(toggleStandOption([['P1']], 'S6', 'S1'), [['P1'], ['S6']]);
});

test('toggleStandOption removes the whole option when one of its stands is clicked again', () => {
  assert.deepEqual(toggleStandOption([['S1', 'S2'], ['P1']], 'S2', null), [['P1']]);
});

test('toggleStandOption refuses a fourth option but still allows removal', () => {
  const standGroups = [['S1', 'S2'], ['P1'], ['S6']];

  assert.equal(toggleStandOption(standGroups, 'M1', null), standGroups);
  assert.deepEqual(toggleStandOption(standGroups, 'P1', null), [['S1', 'S2'], ['S6']]);
});

test('removeSecondStand turns a pair back into a single stand option', () => {
  assert.deepEqual(removeSecondStand([['S1', 'S2'], ['P1']], 0), [['S1'], ['P1']]);
});

test('getActivePairingStandId only accepts a stand that is still a single option', () => {
  assert.equal(getActivePairingStandId([['S1'], ['P1']], 'P1'), 'P1');
  assert.equal(getActivePairingStandId([['S1', 'S2']], 'S1'), null);
  assert.equal(getActivePairingStandId([['S1']], 'M1'), null);
  assert.equal(getActivePairingStandId([['S1']], null), null);
});

test('getSelectedStandIds lists the stands of every option', () => {
  assert.deepEqual(getSelectedStandIds([['S1', 'S2'], ['P1']]), ['S1', 'S2', 'P1']);
});

test('hasStandPair reports whether any option is a pair', () => {
  assert.equal(hasStandPair([['P1'], ['S1', 'S2']]), true);
  assert.equal(hasStandPair([['P1'], ['S6']]), false);
});
