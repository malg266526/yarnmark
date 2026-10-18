import type { VendorApplication } from '../../../../../domain/vendorApplications/vendorFormSubmission.ts';
import { getApplicationStandGroups } from './standChoiceUtils.ts';

const STAND_ASSIGNMENT_VALUE_SEPARATOR = ',';

export interface StandAssignmentOption {
  preferenceOrder: number | null;
  standIds: string[];
  assignedVendors: Pick<VendorApplication, 'id' | 'storeName'>[];
}

export const toStandAssignmentValue = (standIds: string[]): string => standIds.join(STAND_ASSIGNMENT_VALUE_SEPARATOR);

export const fromStandAssignmentValue = (value: string): string[] =>
  value.split(STAND_ASSIGNMENT_VALUE_SEPARATOR).filter(Boolean);

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
  const standOptions = getApplicationStandGroups(application);
  const singleStandIds = standOptions.filter((standIds) => standIds.length === 1).flat();
  const toOption = (standIds: string[], preferenceOrder: number | null): StandAssignmentOption => ({
    preferenceOrder,
    standIds,
    assignedVendors: [
      ...new Map(
        standIds.flatMap((standId) => assignedVendors.get(standId) ?? []).map((vendor) => [vendor.id, vendor])
      ).values()
    ]
  });

  const knownStandIds = [
    ...vendorStandIds,
    ...application.assignedStands.filter((standId) => !vendorStandIds.includes(standId))
  ];

  return {
    otherStands: knownStandIds
      .filter((standId) => !singleStandIds.includes(standId))
      .map((standId) => toOption([standId], null)),
    preferredStands: standOptions.map((standIds, optionIndex) => toOption(standIds, optionIndex + 1))
  };
};
