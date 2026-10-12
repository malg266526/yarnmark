import { VENDOR_FORM_MAX_PREFERRED_STANDS, VENDOR_FORM_STANDS_PER_PAIR } from './vendorFormConstants.ts';

export const getStandsPerPreference = (wantsTwoStands: boolean): number =>
  wantsTwoStands ? VENDOR_FORM_STANDS_PER_PAIR : 1;

export const getMaxPreferredStands = (wantsTwoStands: boolean): number =>
  VENDOR_FORM_MAX_PREFERRED_STANDS * getStandsPerPreference(wantsTwoStands);

export const getPreferredStandGroups = (preferredStands: string[], wantsTwoStands: boolean): string[][] => {
  const groupSize = getStandsPerPreference(wantsTwoStands);

  return Array.from({ length: Math.ceil(preferredStands.length / groupSize) }, (_, groupIndex) =>
    preferredStands.slice(groupIndex * groupSize, groupIndex * groupSize + groupSize)
  );
};

export const hasIncompleteStandPair = (preferredStands: string[], wantsTwoStands: boolean): boolean =>
  wantsTwoStands && preferredStands.length % VENDOR_FORM_STANDS_PER_PAIR !== 0;

export const getOpenPairStandId = (preferredStands: string[], wantsTwoStands: boolean): string | null =>
  hasIncompleteStandPair(preferredStands, wantsTwoStands)
    ? (preferredStands[preferredStands.length - 1] ?? null)
    : null;

export const isEmailValid = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const toggleStandSelection = (current: string[], standId: string, max: number): string[] => {
  if (current.includes(standId)) {
    return current.filter((id) => id !== standId);
  }

  if (current.length >= max) {
    return current;
  }

  return [...current, standId];
};

export const isPhoneValid = (value: string) => /^[+\d\s()-]{7,}$/.test(value.trim());
