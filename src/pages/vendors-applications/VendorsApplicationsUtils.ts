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
  priority: 'highest' | 'medium' | 'lowest';
}

export interface StandApplicationsGroup {
  standId: string;
  requests: StandApplicationRequest[];
}

const PRIORITY_BY_INDEX = ['highest', 'medium', 'lowest'] as const;

const getStandPriority = (standIndex: number): StandApplicationRequest['priority'] =>
  PRIORITY_BY_INDEX[standIndex] ?? 'lowest';

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
      requests: requests.sort(
        (left, right) => new Date(left.submittedAt).getTime() - new Date(right.submittedAt).getTime()
      )
    }));
};
