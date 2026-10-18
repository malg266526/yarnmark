import type { VendorApplication } from '../../../../../domain/vendorApplications/vendorFormSubmission.ts';
import { getApplicationStandGroups } from './standChoiceUtils.ts';

export type StandPriority = 'highest' | 'medium' | 'lowest';

export interface StandRequest {
  applicationId: string;
  pairStandIds: string[];
  priority: StandPriority;
  storeName: string;
  submittedAt: string;
}

export interface StandGroup {
  requests: StandRequest[];
  standId: string;
}

const getStandPriority = (standIndex: number): StandPriority => {
  if (standIndex === 0) {
    return 'highest';
  }

  if (standIndex === 1) {
    return 'medium';
  }

  return 'lowest';
};

const STAND_PRIORITY_ORDER: Record<StandPriority, number> = {
  highest: 0,
  medium: 1,
  lowest: 2
};

export const groupApplicationsByStand = (applications: VendorApplication[]): StandGroup[] => {
  const standGroupsMap = new Map<string, StandRequest[]>();

  for (const application of applications) {
    getApplicationStandGroups(application).forEach((standOption, optionIndex) => {
      for (const standId of standOption) {
        const currentStandRequests = standGroupsMap.get(standId) ?? [];

        currentStandRequests.push({
          applicationId: application.id,
          pairStandIds: standOption.length > 1 ? standOption : [],
          priority: getStandPriority(optionIndex),
          storeName: application.storeName,
          submittedAt: application.submittedAt
        });

        standGroupsMap.set(standId, currentStandRequests);
      }
    });
  }

  return [...standGroupsMap.entries()]
    .map(([standId, requests]) => ({
      standId,
      requests: [...requests].sort((leftRequest, rightRequest) => {
        const priorityDifference =
          STAND_PRIORITY_ORDER[leftRequest.priority] - STAND_PRIORITY_ORDER[rightRequest.priority];

        if (priorityDifference !== 0) {
          return priorityDifference;
        }

        return leftRequest.submittedAt.localeCompare(rightRequest.submittedAt);
      })
    }))
    .sort((leftGroup, rightGroup) => leftGroup.standId.localeCompare(rightGroup.standId, undefined, { numeric: true }));
};
