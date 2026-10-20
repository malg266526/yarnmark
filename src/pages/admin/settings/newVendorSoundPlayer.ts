import type { NewVendorSoundVariant } from './adminSettingsConstants';
import {
  buildScheduledSoundNotes,
  getScheduledSoundDurationS,
  NEW_VENDOR_SOUND_DEFINITIONS
} from './newVendorSoundUtils';

const SILENT_GAIN = 0.001;
const CLOSE_DELAY_MS = 100;

export const playNewVendorSound = async (variant: NewVendorSoundVariant) => {
  const audioContext = new AudioContext();
  const definition = NEW_VENDOR_SOUND_DEFINITIONS[variant];
  const notes = buildScheduledSoundNotes(definition);

  try {
    await audioContext.resume();

    const offsetS = audioContext.currentTime;

    notes.forEach(({ endS, frequencyHz, startS }) => {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();

      oscillator.type = definition.waveform;
      oscillator.frequency.value = frequencyHz;
      gain.gain.setValueAtTime(definition.volume, offsetS + startS);
      gain.gain.exponentialRampToValueAtTime(SILENT_GAIN, offsetS + endS);
      oscillator.connect(gain).connect(audioContext.destination);
      oscillator.start(offsetS + startS);
      oscillator.stop(offsetS + endS);
    });

    window.setTimeout(() => void audioContext.close(), getScheduledSoundDurationS(notes) * 1000 + CLOSE_DELAY_MS);
  } catch (error) {
    console.error('New vendor sound could not be played', error);
    void audioContext.close();
  }
};
