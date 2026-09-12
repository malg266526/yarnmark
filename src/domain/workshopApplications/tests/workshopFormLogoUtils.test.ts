import assert from 'node:assert/strict';
import test from 'node:test';
import { isSupportedLogoMimeType } from '../workshopFormLogoUtils.ts';
import { WORKSHOP_FORM_LOGO_ACCEPTED_MIME_TYPES } from '../workshopFormConstants.ts';

test('isSupportedLogoMimeType accepts every mime type offered by the file picker', () => {
  for (const mimeType of WORKSHOP_FORM_LOGO_ACCEPTED_MIME_TYPES) {
    assert.equal(isSupportedLogoMimeType(mimeType, WORKSHOP_FORM_LOGO_ACCEPTED_MIME_TYPES), true);
  }
});

test('isSupportedLogoMimeType rejects an image format the stored payload schema would refuse', () => {
  assert.equal(isSupportedLogoMimeType('image/bmp', WORKSHOP_FORM_LOGO_ACCEPTED_MIME_TYPES), false);
  assert.equal(isSupportedLogoMimeType('image/svg+xml', WORKSHOP_FORM_LOGO_ACCEPTED_MIME_TYPES), false);
});

test('isSupportedLogoMimeType rejects a file the browser could not type', () => {
  assert.equal(isSupportedLogoMimeType('', WORKSHOP_FORM_LOGO_ACCEPTED_MIME_TYPES), false);
});
