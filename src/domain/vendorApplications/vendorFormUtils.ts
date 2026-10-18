import { VENDOR_FORM_MAX_PREFERRED_STANDS, VENDOR_FORM_STANDS_PER_PAIR } from './vendorFormConstants.ts';

export const getPreferredStandGroups = (preferredStands: string[], wantsTwoStands: boolean): string[][] => {
  const groupSize = wantsTwoStands ? VENDOR_FORM_STANDS_PER_PAIR : 1;

  return Array.from({ length: Math.ceil(preferredStands.length / groupSize) }, (_, groupIndex) =>
    preferredStands.slice(groupIndex * groupSize, groupIndex * groupSize + groupSize)
  );
};

export const getSelectedStandIds = (preferredStandGroups: string[][]): string[] => preferredStandGroups.flat();

export const hasStandPair = (standGroups: string[][]): boolean =>
  standGroups.some((standGroup) => standGroup.length === VENDOR_FORM_STANDS_PER_PAIR);

export const getActivePairingStandId = (
  preferredStandGroups: string[][],
  pairingStandId: string | null
): string | null =>
  pairingStandId &&
  preferredStandGroups.some((standGroup) => standGroup.length === 1 && standGroup[0] === pairingStandId)
    ? pairingStandId
    : null;

export const toggleStandOption = (
  preferredStandGroups: string[][],
  standId: string,
  pairingStandId: string | null
): string[][] => {
  if (preferredStandGroups.some((standGroup) => standGroup.includes(standId))) {
    return preferredStandGroups.filter((standGroup) => !standGroup.includes(standId));
  }

  const activePairingStandId = getActivePairingStandId(preferredStandGroups, pairingStandId);

  if (activePairingStandId) {
    return preferredStandGroups.map((standGroup) =>
      standGroup[0] === activePairingStandId ? [activePairingStandId, standId] : standGroup
    );
  }

  if (preferredStandGroups.length >= VENDOR_FORM_MAX_PREFERRED_STANDS) {
    return preferredStandGroups;
  }

  return [...preferredStandGroups, [standId]];
};

export const removeSecondStand = (preferredStandGroups: string[][], optionIndex: number): string[][] =>
  preferredStandGroups.map((standGroup, groupIndex) =>
    groupIndex === optionIndex ? standGroup.slice(0, 1) : standGroup
  );

export const groupAssignedStands = (assignedStands: string[], preferredStandGroups: string[][]): string[][] => {
  const pairs = preferredStandGroups.filter(
    (standGroup) => standGroup.length > 1 && standGroup.every((standId) => assignedStands.includes(standId))
  );
  const pairedStandIds = new Set<string>();

  return assignedStands.flatMap((standId) => {
    if (pairedStandIds.has(standId)) {
      return [];
    }

    const pair = pairs.find((standGroup) => standGroup.includes(standId));

    if (!pair) {
      return [[standId]];
    }

    pair.forEach((pairStandId) => pairedStandIds.add(pairStandId));

    return [pair];
  });
};

export const isEmailValid = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const isPhoneValid = (value: string) => /^[+\d\s()-]{7,}$/.test(value.trim());
