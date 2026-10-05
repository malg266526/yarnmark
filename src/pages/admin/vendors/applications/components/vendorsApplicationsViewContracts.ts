import type {
  VendorApplication,
  VendorApplicationStatus
} from '../../../../../domain/vendorApplications/vendorFormSubmission.ts';

export type ApplicationsViewMode = 'cards' | 'cascade' | 'stands';

export interface VendorsApplicationsCardsViewProps {
  applications: VendorApplication[];
  deleteApplication: (applicationId: string) => Promise<void>;
  deletingApplicationId: string | null;
  locale: string;
  resolveCategoryLabel: (categoryKey: NonNullable<VendorApplication['mainCategory']>) => string;
  setApplicationStatus: (applicationId: string, status: VendorApplicationStatus) => Promise<void>;
  values: {
    no: string;
    noAnswer: string;
    noneSelected: string;
    notAssigned: string;
    notProvided: string;
    yes: string;
  };
  translate: (translationKey: string, options?: Record<string, unknown>) => string;
}

export interface VendorsApplicationsCascadeViewProps {
  algorithmSteps: string[];
  algorithmTitle: string;
  applications: VendorApplication[];
  allocatedStandLabel: string;
  locale: string;
  manualNegotiationTitle: string;
  preferredStandsLabel: string;
  noneSelectedLabel: string;
  notAssignedLabel: string;
}

export interface VendorsApplicationsStandGroupsViewProps {
  applications: VendorApplication[];
  locale: string;
  resolvePriorityLabel: (priority: 'highest' | 'medium' | 'lowest') => string;
}
