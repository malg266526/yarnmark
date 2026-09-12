import type { VendorApplication } from '../../../../../domain/vendorApplications/vendorFormSubmission.ts';

export const sortApplicationsBySubmittedAt = (applications: VendorApplication[]) =>
  [...applications].sort((leftApplication, rightApplication) =>
    leftApplication.submittedAt.localeCompare(rightApplication.submittedAt)
  );

export const getAcceptedApplicationsSortedBySubmittedAt = (applications: VendorApplication[]) =>
  sortApplicationsBySubmittedAt(applications.filter((application) => application.status === 'accepted'));

export interface CascadeChoiceReservation {
  application: VendorApplication;
  reservedStandId: string | null;
}

export const getCascadeChoiceReservations = (applications: VendorApplication[]): CascadeChoiceReservation[] => {
  const acceptedApplications = getAcceptedApplicationsSortedBySubmittedAt(applications);
  const reservedStandIds = new Set<string>();

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
