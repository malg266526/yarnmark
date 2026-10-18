import type { VendorApplication } from '../../../../../domain/vendorApplications/vendorFormSubmission.ts';

export const STAND_GROUP_SEPARATOR = ' + ';

export const getApplicationStandGroups = ({ preferredStandGroups }: VendorApplication): string[][] => {
  const seenStandIds = new Set<string>();

  return preferredStandGroups.flatMap((standGroup) => {
    const newStandIds = standGroup.filter((standId) => !seenStandIds.has(standId));

    newStandIds.forEach((standId) => seenStandIds.add(standId));

    return newStandIds.length > 0 ? [newStandIds] : [];
  });
};

export const getStandChoicePositions = (application: VendorApplication): ReadonlyMap<string, number> => {
  const choicePositions = new Map<string, number>();

  getApplicationStandGroups(application).forEach((standGroup, groupIndex) => {
    for (const standId of standGroup) {
      if (!choicePositions.has(standId)) {
        choicePositions.set(standId, groupIndex + 1);
      }
    }
  });

  return choicePositions;
};

export const formatStandGroup = (standGroup: string[]): string => standGroup.join(STAND_GROUP_SEPARATOR);
