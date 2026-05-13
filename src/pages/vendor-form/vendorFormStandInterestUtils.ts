import type { VendorApplication } from './vendorFormSubmission.ts';
import { VENDOR_FORM_HIGH_INTEREST_MIN_REQUESTS } from './vendorFormConstants.ts';

export const getStandInterestCounts = (applications: VendorApplication[]) => {
  const counts = new Map<string, number>();

  for (const application of applications) {
    const uniqueStandIds = new Set(application.preferredStands);

    for (const standId of uniqueStandIds) {
      counts.set(standId, (counts.get(standId) ?? 0) + 1);
    }
  }

  return counts;
};

export const isHighInterestStand = (interestCount: number) => interestCount >= VENDOR_FORM_HIGH_INTEREST_MIN_REQUESTS;

export const getHighInterestStandIds = (applications: VendorApplication[]) =>
  [...getStandInterestCounts(applications).entries()]
    .filter(([, interestCount]) => isHighInterestStand(interestCount))
    .map(([standId]) => standId);
