import assert from 'node:assert/strict';
import test from 'node:test';
import { isFormDraftRestorable, resolveFormDraftStatus } from '../formDraftStatusUtils.ts';

test('resolveFormDraftStatus returns none for a fresh untouched form', () => {
  assert.equal(resolveFormDraftStatus({ isComplete: false, isDirty: false, wasRestored: false }), 'none');
});

test('resolveFormDraftStatus returns restored for an untouched restored draft', () => {
  assert.equal(resolveFormDraftStatus({ isComplete: false, isDirty: false, wasRestored: true }), 'restored');
});

test('resolveFormDraftStatus returns saved once the form is edited', () => {
  assert.equal(resolveFormDraftStatus({ isComplete: false, isDirty: true, wasRestored: true }), 'saved');
  assert.equal(resolveFormDraftStatus({ isComplete: false, isDirty: true, wasRestored: false }), 'saved');
});

test('resolveFormDraftStatus returns none after a completed submission', () => {
  assert.equal(resolveFormDraftStatus({ isComplete: true, isDirty: false, wasRestored: true }), 'none');
});

const INITIAL_FORM_DATA = { name: '', tags: [] as string[], logo: null as string | null };

test('isFormDraftRestorable returns false when there is no stored draft', () => {
  assert.equal(isFormDraftRestorable(null, INITIAL_FORM_DATA), false);
});

test('isFormDraftRestorable returns false for a stored draft equal to the initial state', () => {
  assert.equal(isFormDraftRestorable({ formData: INITIAL_FORM_DATA, isComplete: false }, INITIAL_FORM_DATA), false);
});

test('isFormDraftRestorable ignores key order of the stored draft', () => {
  assert.equal(
    isFormDraftRestorable({ formData: { logo: null, tags: [], name: '' }, isComplete: false }, INITIAL_FORM_DATA),
    false
  );
});

test('isFormDraftRestorable returns true for a stored draft with user input', () => {
  assert.equal(
    isFormDraftRestorable({ formData: { ...INITIAL_FORM_DATA, tags: ['A1'] }, isComplete: false }, INITIAL_FORM_DATA),
    true
  );
});

test('isFormDraftRestorable returns false for a completed draft', () => {
  assert.equal(
    isFormDraftRestorable({ formData: { ...INITIAL_FORM_DATA, name: 'Shop' }, isComplete: true }, INITIAL_FORM_DATA),
    false
  );
});
