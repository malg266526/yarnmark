import type { VendorApplication } from '../../../../../domain/vendorApplications/vendorFormSubmission.ts';
import { getStandInterestCounts } from '../../../../../domain/vendorApplications/vendorFormStandInterestUtils.ts';

export interface VendorApplicationStandPreference {
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
    preferences: [...new Set(application.preferredStands)].map((standId) => ({
      competitorCount: Math.max((requestCounts.get(standId) ?? 1) - 1, 0),
      standId
    }))
  }));
};
