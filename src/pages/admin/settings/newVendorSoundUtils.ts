import type { NewVendorSoundVariant } from './adminSettingsConstants.ts';

export interface NewVendorSoundDefinition {
  frequenciesHz: readonly number[];
  noteDurationS: number;
  noteGapS: number;
  repeatCount: number;
  repeatGapS: number;
  volume: number;
  waveform: OscillatorType;
}

export interface ScheduledSoundNote {
  endS: number;
  frequencyHz: number;
  startS: number;
}

export const NEW_VENDOR_SOUND_DEFINITIONS: Record<NewVendorSoundVariant, NewVendorSoundDefinition> = {
  chime: {
    frequenciesHz: [880, 1320],
    noteDurationS: 0.3,
    noteGapS: 0,
    repeatCount: 3,
    repeatGapS: 0.25,
    volume: 0.2,
    waveform: 'sine'
  },
  melody: {
    frequenciesHz: [1047, 1319, 1568],
    noteDurationS: 0.22,
    noteGapS: 0,
    repeatCount: 2,
    repeatGapS: 0.3,
    volume: 0.25,
    waveform: 'triangle'
  },
  beeps: {
    frequenciesHz: [1000, 1000, 1000, 1000],
    noteDurationS: 0.12,
    noteGapS: 0.08,
    repeatCount: 3,
    repeatGapS: 0.4,
    volume: 0.06,
    waveform: 'square'
  }
};

export const buildScheduledSoundNotes = ({
  frequenciesHz,
  noteDurationS,
  noteGapS,
  repeatCount,
  repeatGapS
}: NewVendorSoundDefinition): ScheduledSoundNote[] => {
  const repeatDurationS = frequenciesHz.length * noteDurationS + (frequenciesHz.length - 1) * noteGapS;

  return Array.from({ length: repeatCount }, (_, repeatIndex) =>
    frequenciesHz.map((frequencyHz, noteIndex) => {
      const startS = repeatIndex * (repeatDurationS + repeatGapS) + noteIndex * (noteDurationS + noteGapS);

      return { endS: startS + noteDurationS, frequencyHz, startS };
    })
  ).flat();
};

export const getScheduledSoundDurationS = (notes: ScheduledSoundNote[]) =>
  notes.reduce((durationS, { endS }) => Math.max(durationS, endS), 0);
