import type { VendorApplication } from '../../../../../domain/vendorApplications/vendorFormSubmission.ts';

export interface StandAssignmentOption {
  preferenceOrder: number | null;
  standId: string;
  assignedVendors: Pick<VendorApplication, 'id' | 'storeName'>[];
}

export interface StandAssignmentOptions {
  otherStands: StandAssignmentOption[];
  preferredStands: StandAssignmentOption[];
}

const collectAssignedVendors = (applications: VendorApplication[], currentApplicationId: string) => {
  const assignments = new Map<string, StandAssignmentOption['assignedVendors']>();

  for (const { id, assignedStands, storeName } of applications) {
    if (id === currentApplicationId) continue;

    for (const standId of new Set(assignedStands)) {
      const vendors = assignments.get(standId) ?? [];
      vendors.push({ id, storeName });
      assignments.set(standId, vendors);
    }
  }

  return assignments;
};

export const buildStandAssignmentOptions = (
  application: VendorApplication,
  applications: VendorApplication[],
  vendorStandIds: string[]
): StandAssignmentOptions => {
  const assignedVendors = collectAssignedVendors(applications, application.id);
  const preferredStandIds = [...new Set(application.preferredStands)];
  const toOption = (standId: string): StandAssignmentOption => ({
    preferenceOrder: preferredStandIds.includes(standId) ? preferredStandIds.indexOf(standId) + 1 : null,
    standId,
    assignedVendors: assignedVendors.get(standId) ?? []
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
