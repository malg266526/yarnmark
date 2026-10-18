import type { VendorApplication } from '../../../../../domain/vendorApplications/vendorFormSubmission.ts';
import { getStandInterestCounts } from '../../../../../domain/vendorApplications/vendorFormStandInterestUtils.ts';
import { getApplicationStandGroups, getStandChoicePositions } from './standChoiceUtils.ts';

export interface VendorApplicationStandPreference {
  competitorCount: number;
  standId: string;
}

export interface VendorApplicationStandOption {
  choicePosition: number;
  stands: VendorApplicationStandPreference[];
}

export interface VendorApplicationRow {
  application: VendorApplication;
  preferences: VendorApplicationStandOption[];
}

export const buildVendorApplicationRows = (
  visibleApplications: VendorApplication[],
  allApplications: VendorApplication[]
): VendorApplicationRow[] => {
  const requestCounts = getStandInterestCounts(allApplications);

  return visibleApplications.map((application) => ({
    application,
    preferences: getApplicationStandGroups(application).map((standGroup, groupIndex) => ({
      choicePosition: groupIndex + 1,
      stands: standGroup.map((standId) => ({
        competitorCount: Math.max((requestCounts.get(standId) ?? 1) - 1, 0),
        standId
      }))
    }))
  }));
};

export interface StandPairHighlight {
  choicePosition: number;
  standIds: string[];
}

export const buildStandPairHighlights = (application: VendorApplication | null): StandPairHighlight[] =>
  application
    ? getApplicationStandGroups(application).flatMap((standGroup, groupIndex) =>
        standGroup.length > 1 ? [{ choicePosition: groupIndex + 1, standIds: standGroup }] : []
      )
    : [];

export const buildStandPriorityHighlights = (application: VendorApplication | null): ReadonlyMap<string, number> =>
  application ? getStandChoicePositions(application) : new Map<string, number>();
