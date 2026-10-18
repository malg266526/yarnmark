import type { VendorApplication } from '../../../../../domain/vendorApplications/vendorFormSubmission.ts';
import { getStandInterestCounts } from '../../../../../domain/vendorApplications/vendorFormStandInterestUtils.ts';
import { getStandChoicePositions } from './standChoiceUtils.ts';

export interface VendorApplicationStandPreference {
  choicePosition: number;
  competitorCount: number;
  standId: string;
}

export interface VendorApplicationRow {
  application: VendorApplication;
  preferences: VendorApplicationStandPreference[];
}

export const buildVendorApplicationRows = (
  visibleApplications: VendorApplication[],
  allApplications: VendorApplication[]
): VendorApplicationRow[] => {
  const requestCounts = getStandInterestCounts(allApplications);

  return visibleApplications.map((application) => ({
    application,
    preferences: [...getStandChoicePositions(application)].map(([standId, choicePosition]) => ({
      choicePosition,
      competitorCount: Math.max((requestCounts.get(standId) ?? 1) - 1, 0),
      standId
    }))
  }));
};

export const buildStandPriorityHighlights = (application: VendorApplication | null): ReadonlyMap<string, number> =>
  application ? getStandChoicePositions(application) : new Map<string, number>();
