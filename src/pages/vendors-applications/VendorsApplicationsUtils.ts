import type { VendorApplication, VendorApplicationStatus } from '../vendor-form/vendorFormSubmission.ts';

export interface BooleanLabels {
  no: string;
  noAnswer: string;
  yes: string;
}

export const formatBoolean = (value: boolean | null, labels: BooleanLabels) => {
  if (value === null) {
    return labels.noAnswer;
  }

  return value ? labels.yes : labels.no;
};

export const formatMainCategory = (
  application: VendorApplication,
  resolveCategoryLabel: (categoryKey: NonNullable<VendorApplication['mainCategory']>) => string,
  notProvidedLabel: string
) => {
  if (application.mainCategory === 'other') {
    return application.mainCategoryOther || notProvidedLabel;
  }

  if (!application.mainCategory) {
    return notProvidedLabel;
  }

  return resolveCategoryLabel(application.mainCategory);
};

export const formatDateTime = (value: string, locale: string) =>
  new Intl.DateTimeFormat(locale, {
    dateStyle: 'long',
    timeStyle: 'medium'
  }).format(new Date(value));

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

export const VENDOR_APPLICATION_STATUS_ORDER: VendorApplicationStatus[] = ['new', 'considered', 'accepted', 'reserve'];

export type StandPriority = 'highest' | 'medium' | 'lowest';

export interface StandRequest {
  applicationId: string;
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
    application.preferredStands.forEach((standId, standIndex) => {
      const currentStandRequests = standGroupsMap.get(standId) ?? [];

      currentStandRequests.push({
        applicationId: application.id,
        priority: getStandPriority(standIndex),
        storeName: application.storeName,
        submittedAt: application.submittedAt
      });

      standGroupsMap.set(standId, currentStandRequests);
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
