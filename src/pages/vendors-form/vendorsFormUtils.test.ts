import test from 'node:test';
import assert from 'node:assert/strict';
import { getVendorsFormErrorKey, isEmailValid, isPhoneValid, toggleStandSelection } from './vendorsFormUtils.ts';
import { INITIAL_VENDORS_FORM_STATE } from './vendorsFormTypes.ts';
import { getInitialVendorsFormDraft, parseVendorsFormDraft } from './vendorsFormStorage.ts';

const getBaseValidState = () => ({
  ...INITIAL_VENDORS_FORM_STATE,
  storeName: 'Shop name',
  attendedBefore: true,
  mainCategory: 'yarns' as const,
  mainCategoryOther: '',
  preferredStands: [],
  interestedIfUnavailable: true,
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

test('getVendorsFormErrorKey requires store name on step 0', () => {
  assert.equal(getVendorsFormErrorKey(INITIAL_VENDORS_FORM_STATE), 'vendorsFormPage.validation.storeNameRequired');
});

test('getVendorsFormErrorKey requires attendedBefore after store name', () => {
  const state = { ...INITIAL_VENDORS_FORM_STATE, storeName: 'Shop name' };

  assert.equal(getVendorsFormErrorKey(state), 'vendorsFormPage.validation.attendedBeforeRequired');
});

test('getVendorsFormErrorKey requires main category after attendedBefore', () => {
  const state = { ...INITIAL_VENDORS_FORM_STATE, storeName: 'Shop name', attendedBefore: true };

  assert.equal(getVendorsFormErrorKey(state), 'vendorsFormPage.validation.mainCategoryRequired');
});

test('getVendorsFormErrorKey requires other main category details when other is selected', () => {
  const state = {
    ...INITIAL_VENDORS_FORM_STATE,
    storeName: 'Shop name',
    attendedBefore: true,
    mainCategory: 'other' as const
  };

  assert.equal(getVendorsFormErrorKey(state), 'vendorsFormPage.validation.mainCategoryOtherRequired');
});

test('getVendorsFormErrorKey requires fallback interest after category', () => {
  const state = {
    ...INITIAL_VENDORS_FORM_STATE,
    storeName: 'Shop name',
    attendedBefore: true,
    mainCategory: 'other' as const,
    mainCategoryOther: 'Buttons'
  };

  assert.equal(getVendorsFormErrorKey(state), 'vendorsFormPage.validation.interestedIfUnavailableRequired');
});

test('getVendorsFormErrorKey requires phone before email checks', () => {
  const state = {
    ...getBaseValidState(),
    phoneNumber: '',
    acceptedStatute: false
  };

  assert.equal(getVendorsFormErrorKey(state), 'vendorsFormPage.validation.phoneRequired');
});

test('getVendorsFormErrorKey rejects invalid phone', () => {
  const state = {
    ...getBaseValidState(),
    phoneNumber: '12345'
  };

  assert.equal(getVendorsFormErrorKey(state), 'vendorsFormPage.validation.phoneInvalid');
});

test('getVendorsFormErrorKey requires email after valid phone', () => {
  const state = {
    ...getBaseValidState(),
    email: ''
  };

  assert.equal(getVendorsFormErrorKey(state), 'vendorsFormPage.validation.emailRequired');
});

test('getVendorsFormErrorKey rejects invalid email', () => {
  const state = {
    ...getBaseValidState(),
    email: 'vendor.example.com'
  };

  assert.equal(getVendorsFormErrorKey(state), 'vendorsFormPage.validation.emailInvalid');
});

test('getVendorsFormErrorKey requires invoice details', () => {
  const state = {
    ...getBaseValidState(),
    invoiceDetails: ''
  };

  assert.equal(getVendorsFormErrorKey(state), 'vendorsFormPage.validation.invoiceDetailsRequired');
});

test('getVendorsFormErrorKey requires business description after invoice details', () => {
  const state = {
    ...getBaseValidState(),
    businessDescription: ''
  };

  assert.equal(getVendorsFormErrorKey(state), 'vendorsFormPage.validation.businessDescriptionRequired');
});

test('getVendorsFormErrorKey accepts a missing logo filename (logo is optional)', () => {
  const state = {
    ...getBaseValidState(),
    logoFileName: null
  };

  assert.equal(getVendorsFormErrorKey(state), null);
});

test('getVendorsFormErrorKey rejects too long business description', () => {
  const state = {
    ...getBaseValidState(),
    businessDescription: 'a'.repeat(2201)
  };

  assert.equal(getVendorsFormErrorKey(state), 'vendorsFormPage.validation.businessDescriptionTooLong');
});

test('getVendorsFormErrorKey requires statute acceptance last', () => {
  const state = {
    ...getBaseValidState(),
    acceptedStatute: false
  };

  assert.equal(getVendorsFormErrorKey(state), 'vendorsFormPage.validation.statuteRequired');
});

test('getVendorsFormErrorKey returns null for valid data', () => {
  const state = getBaseValidState();

  assert.equal(getVendorsFormErrorKey(state), null);
});

test('parseVendorsFormDraft returns null for invalid payload', () => {
  assert.equal(parseVendorsFormDraft(null), null);
  assert.equal(parseVendorsFormDraft('not-json'), null);
  assert.equal(parseVendorsFormDraft(JSON.stringify({ foo: 'bar' })), null);
});

test('parseVendorsFormDraft restores a valid payload', () => {
  const draft = {
    formData: {
      ...getBaseValidState(),
      preferredStands: ['stand-1', 'stand-2'],
      interestedIfUnavailable: false
    },
    isComplete: true
  };

  assert.deepEqual(parseVendorsFormDraft(JSON.stringify(draft)), draft);
});

test('parseVendorsFormDraft normalizes stored hall ids to readable stand ids', () => {
  const draft = {
    formData: {
      ...getBaseValidState(),
      preferredStands: ['mgl60s92-lscpjj7', 'mgl65qbi-2kfiih9']
    },
    isComplete: false
  };

  assert.deepEqual(parseVendorsFormDraft(JSON.stringify(draft)), {
    formData: {
      ...draft.formData,
      preferredStands: ['P2', 'P3']
    },
    isComplete: false
  });
});

test('parseVendorsFormDraft rejects a payload missing preferredStands', () => {
  const draft = {
    formData: {
      storeName: 'Shop name',
      attendedBefore: true,
      mainCategory: 'yarns' as const,
      mainCategoryOther: '',
      interestedIfUnavailable: false,
      phoneNumber: '+48 123 456 789',
      email: 'vendor@example.com',
      invoiceDetails: 'Invoice details',
      logoFileName: 'logo.png',
      businessDescription: 'Short business description',
      acceptedStatute: true
    },
    isComplete: true
  };

  assert.equal(parseVendorsFormDraft(JSON.stringify(draft)), null);
});

test('getInitialVendorsFormDraft returns empty initial state', () => {
  assert.deepEqual(getInitialVendorsFormDraft(), {
    formData: INITIAL_VENDORS_FORM_STATE,
    isComplete: false
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
