import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getNextVendorsFormStep,
  getPreviousVendorsFormStep,
  getVendorsFormErrorKey,
  isEmailValid,
  isLastVendorsFormStep,
  isPhoneValid
} from './vendorsFormUtils.ts';
import { INITIAL_VENDORS_FORM_STATE } from './vendorsFormTypes.ts';

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
  assert.equal(getVendorsFormErrorKey(0, INITIAL_VENDORS_FORM_STATE), 'vendorsFormPage.validation.storeNameRequired');
});

test('getVendorsFormErrorKey requires attendedBefore on step 1', () => {
  const state = { ...INITIAL_VENDORS_FORM_STATE, storeName: 'Shop name' };

  assert.equal(getVendorsFormErrorKey(1, state), 'vendorsFormPage.validation.attendedBeforeRequired');
});

test('getVendorsFormErrorKey requires phone before email checks on step 2', () => {
  const state = { ...INITIAL_VENDORS_FORM_STATE, phoneNumber: '', email: 'vendor@example.com' };

  assert.equal(getVendorsFormErrorKey(2, state), 'vendorsFormPage.validation.phoneRequired');
});

test('getVendorsFormErrorKey rejects invalid phone on step 2', () => {
  const state = { ...INITIAL_VENDORS_FORM_STATE, phoneNumber: '12345', email: 'vendor@example.com' };

  assert.equal(getVendorsFormErrorKey(2, state), 'vendorsFormPage.validation.phoneInvalid');
});

test('getVendorsFormErrorKey requires email on step 2 after valid phone', () => {
  const state = { ...INITIAL_VENDORS_FORM_STATE, phoneNumber: '+48 123 456 789', email: '' };

  assert.equal(getVendorsFormErrorKey(2, state), 'vendorsFormPage.validation.emailRequired');
});

test('getVendorsFormErrorKey rejects invalid email on step 2', () => {
  const state = { ...INITIAL_VENDORS_FORM_STATE, phoneNumber: '+48 123 456 789', email: 'vendor.example.com' };

  assert.equal(getVendorsFormErrorKey(2, state), 'vendorsFormPage.validation.emailInvalid');
});

test('getVendorsFormErrorKey requires statute acceptance on step 3', () => {
  assert.equal(getVendorsFormErrorKey(3, INITIAL_VENDORS_FORM_STATE), 'vendorsFormPage.validation.statuteRequired');
});

test('getVendorsFormErrorKey returns null for valid data', () => {
  const state = {
    storeName: 'Shop name',
    attendedBefore: 'yes' as const,
    phoneNumber: '+48 123 456 789',
    email: 'vendor@example.com',
    acceptedStatute: true
  };

  assert.equal(getVendorsFormErrorKey(0, state), null);
  assert.equal(getVendorsFormErrorKey(1, state), null);
  assert.equal(getVendorsFormErrorKey(2, state), null);
  assert.equal(getVendorsFormErrorKey(3, state), null);
});

test('step helpers clamp navigation correctly', () => {
  assert.equal(getPreviousVendorsFormStep(0), 0);
  assert.equal(getPreviousVendorsFormStep(3), 2);
  assert.equal(getNextVendorsFormStep(0), 1);
  assert.equal(getNextVendorsFormStep(3), 3);
  assert.equal(isLastVendorsFormStep(2), false);
  assert.equal(isLastVendorsFormStep(3), true);
});
