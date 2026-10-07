import type { VendorApplication } from '../../../../../domain/vendorApplications/vendorFormSubmission.ts';

export const compareApplicationsBySubmittedAt = (
  leftApplication: VendorApplication,
  rightApplication: VendorApplication
) => leftApplication.submittedAt.localeCompare(rightApplication.submittedAt);

export const sortApplicationsBySubmittedAt = (applications: VendorApplication[]) =>
  [...applications].sort(compareApplicationsBySubmittedAt);

export const getAcceptedApplicationsSortedBySubmittedAt = (applications: VendorApplication[]) =>
  sortApplicationsBySubmittedAt(applications.filter((application) => application.status === 'accepted'));

export interface CascadeChoiceReservation {
  application: VendorApplication;
  reservedStandId: string | null;
}

export const getCascadeChoiceReservations = (applications: VendorApplication[]): CascadeChoiceReservation[] => {
  const acceptedApplications = getAcceptedApplicationsSortedBySubmittedAt(applications).filter(
    ({ assignedStands }) => assignedStands.length === 0
  );
  const reservedStandIds = new Set(applications.flatMap(({ assignedStands }) => assignedStands));

  return acceptedApplications.map((application) => {
    const firstChoiceStandId = application.preferredStands[0] ?? null;
    const secondChoiceStandId = application.preferredStands[1] ?? null;
    const thirdChoiceStandId = application.preferredStands[2] ?? null;

    if (firstChoiceStandId && !reservedStandIds.has(firstChoiceStandId)) {
      reservedStandIds.add(firstChoiceStandId);

      return {
        application,
        reservedStandId: firstChoiceStandId
      };
    }

    if (secondChoiceStandId && !reservedStandIds.has(secondChoiceStandId)) {
      reservedStandIds.add(secondChoiceStandId);

      return {
        application,
        reservedStandId: secondChoiceStandId
      };
    }

    if (thirdChoiceStandId && !reservedStandIds.has(thirdChoiceStandId)) {
      reservedStandIds.add(thirdChoiceStandId);

      return {
        application,
        reservedStandId: thirdChoiceStandId
      };
    }

    return {
      application,
      reservedStandId: null
    };
  });
};

export const getCascadeManualNegotiationReservations = (applications: VendorApplication[]) =>
  getCascadeChoiceReservations(applications).filter(({ reservedStandId }) => reservedStandId === null);

export interface CascadeEligibilitySummary {
  acceptedCount: number;
  acceptedWithStandsCount: number;
  eligibleCount: number;
}

export const summarizeCascadeEligibility = (applications: VendorApplication[]): CascadeEligibilitySummary => {
  const acceptedApplications = applications.filter(({ status }) => status === 'accepted');
  const acceptedWithStandsCount = acceptedApplications.filter(({ assignedStands }) => assignedStands.length > 0).length;

  return {
    acceptedCount: acceptedApplications.length,
    acceptedWithStandsCount,
    eligibleCount: acceptedApplications.length - acceptedWithStandsCount
  };
};
