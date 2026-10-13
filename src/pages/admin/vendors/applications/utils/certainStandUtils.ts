import type { VendorApplication } from '../../../../../domain/vendorApplications/vendorFormSubmission.ts';

export interface CertainStandProposal {
  applicationId: string;
  choicePosition: number;
  standId: string;
  storeName: string;
}

/** A rejected vendor no longer competes, and a vendor who already holds a stand no longer blocks one. */
const isCompetingForStands = (application: VendorApplication) =>
  application.status !== 'rejected' && application.assignedStands.length === 0;

export const getCertainStandProposals = (applications: VendorApplication[]): CertainStandProposal[] => {
  const takenStandIds = new Set(applications.flatMap(({ assignedStands }) => assignedStands));
  const requestsByStandId = new Map<string, CertainStandProposal[]>();

  for (const application of applications.filter(isCompetingForStands)) {
    const countedStandIds = new Set<string>();

    application.preferredStands.forEach((standId, standIndex) => {
      if (takenStandIds.has(standId) || countedStandIds.has(standId)) {
        return;
      }

      countedStandIds.add(standId);
      requestsByStandId.set(standId, [
        ...(requestsByStandId.get(standId) ?? []),
        {
          applicationId: application.id,
          choicePosition: standIndex + 1,
          standId,
          storeName: application.storeName
        }
      ]);
    });
  }

  return [...requestsByStandId.values()]
    .filter((standRequests) => standRequests.length === 1)
    .map(([standRequest]) => standRequest)
    .sort((leftRequest, rightRequest) =>
      leftRequest.standId.localeCompare(rightRequest.standId, undefined, { numeric: true })
    );
};

export const countCertainStandsByApplication = (proposals: CertainStandProposal[]): ReadonlyMap<string, number> => {
  const countsByApplicationId = new Map<string, number>();

  for (const { applicationId } of proposals) {
    countsByApplicationId.set(applicationId, (countsByApplicationId.get(applicationId) ?? 0) + 1);
  }

  return countsByApplicationId;
};
