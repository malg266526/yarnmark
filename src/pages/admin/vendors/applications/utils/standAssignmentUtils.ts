import type { VendorApplication } from '../../../../../domain/vendorApplications/vendorFormSubmission.ts';

export interface StandAssignmentOption {
  preferenceOrder: number | null;
  standId: string;
  takenBy: string | null;
}

export interface StandAssignmentOptions {
  otherStands: StandAssignmentOption[];
  preferredStands: StandAssignmentOption[];
}

const collectStandOwners = (applications: VendorApplication[], ownerApplicationId: string) =>
  new Map(
    applications
      .filter(({ id }) => id !== ownerApplicationId)
      .flatMap(({ assignedStands, storeName }) => assignedStands.map((standId) => [standId, storeName] as const))
  );

export const buildStandAssignmentOptions = (
  application: VendorApplication,
  applications: VendorApplication[],
  vendorStandIds: string[]
): StandAssignmentOptions => {
  const standOwners = collectStandOwners(applications, application.id);
  const preferredStandIds = [...new Set(application.preferredStands)];
  const toOption = (standId: string): StandAssignmentOption => ({
    preferenceOrder: preferredStandIds.includes(standId) ? preferredStandIds.indexOf(standId) + 1 : null,
    standId,
    takenBy: standOwners.get(standId) ?? null
  });

  const knownStandIds = [
    ...vendorStandIds,
    ...application.assignedStands.filter((standId) => !vendorStandIds.includes(standId))
  ];

  return {
    otherStands: knownStandIds.filter((standId) => !preferredStandIds.includes(standId)).map(toOption),
    preferredStands: preferredStandIds.map(toOption)
  };
};
