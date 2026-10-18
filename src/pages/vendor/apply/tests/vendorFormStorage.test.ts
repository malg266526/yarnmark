import assert from 'node:assert/strict';
import test from 'node:test';
import { INITIAL_VENDOR_FORM_STATE } from '../../../../domain/vendorApplications/vendorFormTypes.ts';
import { parseStoredVendorFormDraft } from '../vendorFormStorage.ts';

test('a draft saved before the comments field existed is restored with empty comments', () => {
  const legacyFormData: Partial<typeof INITIAL_VENDOR_FORM_STATE> = { ...INITIAL_VENDOR_FORM_STATE };
  delete legacyFormData.comments;
  const draft = parseStoredVendorFormDraft(JSON.stringify({ formData: legacyFormData, isComplete: false }));

  assert.equal(draft?.formData.comments, '');
});

test('a draft keeps the comments typed by the vendor', () => {
  const draft = parseStoredVendorFormDraft(
    JSON.stringify({ formData: { ...INITIAL_VENDOR_FORM_STATE, comments: 'Uwaga' }, isComplete: false })
  );

  assert.equal(draft?.formData.comments, 'Uwaga');
});
