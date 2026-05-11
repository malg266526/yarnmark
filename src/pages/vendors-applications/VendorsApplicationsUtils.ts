import type { VendorApplication } from '../vendors-form/vendorsFormSubmission';

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
  [...applications].sort((left, right) => new Date(left.submittedAt).getTime() - new Date(right.submittedAt).getTime());

export interface StandApplicationRequest {
  applicationId: string;
  storeName: string;
  submittedAt: string;
  priority: 'highest' | 'medium' | 'compromise';
}

export interface StandApplicationsGroup {
  standId: string;
  requests: StandApplicationRequest[];
}

const getStandPriority = (standIndex: number): StandApplicationRequest['priority'] => {
  if (standIndex === 0) {
    return 'highest';
  }

  if (standIndex === 1) {
    return 'medium';
  }

  return 'compromise';
};

const priorityOrder: Record<StandApplicationRequest['priority'], number> = {
  highest: 0,
  medium: 1,
  compromise: 2
};

export const groupApplicationsByStand = (applications: VendorApplication[]): StandApplicationsGroup[] => {
  const standRequests = new Map<string, StandApplicationRequest[]>();

  for (const application of applications) {
    for (const [standIndex, standId] of application.preferredStands.entries()) {
      const requests = standRequests.get(standId) ?? [];

      requests.push({
        applicationId: application.id,
        storeName: application.storeName,
        submittedAt: application.submittedAt,
        priority: getStandPriority(standIndex)
      });

      standRequests.set(standId, requests);
    }
  }

  return [...standRequests.entries()]
    .sort(([leftStandId], [rightStandId]) => leftStandId.localeCompare(rightStandId, undefined, { numeric: true }))
    .map(([standId, requests]) => ({
      standId,
      requests: requests.sort((left, right) => {
        const priorityDifference = priorityOrder[left.priority] - priorityOrder[right.priority];

        if (priorityDifference !== 0) {
          return priorityDifference;
        }

        return new Date(left.submittedAt).getTime() - new Date(right.submittedAt).getTime();
      })
    }));
};
