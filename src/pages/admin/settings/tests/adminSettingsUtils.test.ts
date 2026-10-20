import assert from 'node:assert/strict';
import test from 'node:test';
import { parseStoredNewVendorSoundSetting, parseStoredNewVendorSoundVariant } from '../adminSettingsUtils.ts';

test('parseStoredNewVendorSoundSetting is enabled only for a stored true', () => {
  assert.equal(parseStoredNewVendorSoundSetting('true'), true);
  assert.equal(parseStoredNewVendorSoundSetting('false'), false);
  assert.equal(parseStoredNewVendorSoundSetting('"true"'), false);
  assert.equal(parseStoredNewVendorSoundSetting('1'), false);
});

test('parseStoredNewVendorSoundVariant restores a known variant and falls back to the default', () => {
  assert.equal(parseStoredNewVendorSoundVariant('"melody"'), 'melody');
  assert.equal(parseStoredNewVendorSoundVariant('"beeps"'), 'beeps');
  assert.equal(parseStoredNewVendorSoundVariant('"siren"'), 'chime');
  assert.equal(parseStoredNewVendorSoundVariant('3'), 'chime');
});
