import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildScheduledSoundNotes,
  getScheduledSoundDurationS,
  NEW_VENDOR_SOUND_DEFINITIONS,
  type NewVendorSoundDefinition
} from '../newVendorSoundUtils.ts';
import { NEW_VENDOR_SOUND_VARIANTS } from '../adminSettingsConstants.ts';

const definition: NewVendorSoundDefinition = {
  frequenciesHz: [100, 200],
  noteDurationS: 1,
  noteGapS: 0.5,
  repeatCount: 2,
  repeatGapS: 2,
  volume: 0.1,
  waveform: 'sine'
};

test('buildScheduledSoundNotes places notes with gaps inside a repeat and between repeats', () => {
  assert.deepEqual(buildScheduledSoundNotes(definition), [
    { endS: 1, frequencyHz: 100, startS: 0 },
    { endS: 2.5, frequencyHz: 200, startS: 1.5 },
    { endS: 5.5, frequencyHz: 100, startS: 4.5 },
    { endS: 7, frequencyHz: 200, startS: 6 }
  ]);
});

test('getScheduledSoundDurationS ends with the last note', () => {
  assert.equal(getScheduledSoundDurationS(buildScheduledSoundNotes(definition)), 7);
  assert.equal(getScheduledSoundDurationS([]), 0);
});

test('every sound variant has a definition that plays at least one note', () => {
  NEW_VENDOR_SOUND_VARIANTS.forEach((variant) => {
    assert.ok(buildScheduledSoundNotes(NEW_VENDOR_SOUND_DEFINITIONS[variant]).length > 0, variant);
  });
});
