import type {
  VendorApplication,
  VendorApplicationStatus
} from '../../../../../domain/vendorApplications/vendorFormSubmission.ts';
import type {
  VendorApplicationsFilters,
  VendorApplicationStatusCounts
} from '../utils/vendorApplicationsFilterUtils.ts';

export interface VendorApplicationDisplayValues {
  no: string;
  noAnswer: string;
  noneSelected: string;
  notAssigned: string;
  notProvided: string;
  yes: string;
}

export type ResolveCategoryLabel = (categoryKey: NonNullable<VendorApplication['mainCategory']>) => string;

export type TranslateViewText = (translationKey: string, options?: Record<string, unknown>) => string;

export interface VendorApplicationDetailsViewProps {
  application: VendorApplication;
  deleteApplication: (applicationId: string) => Promise<void>;
  deletingApplicationId: string | null;
  resolveCategoryLabel: ResolveCategoryLabel;
  setApplicationStatus: (applicationId: string, status: VendorApplicationStatus) => Promise<void>;
  translate: TranslateViewText;
  values: VendorApplicationDisplayValues;
}

export interface VendorApplicationDetailsDrawerProps extends Omit<VendorApplicationDetailsViewProps, 'application'> {
  application: VendorApplication | null;
  closeApplication: () => void;
  locale: string;
}

export interface VendorsApplicationsRowsViewProps {
  allApplications: VendorApplication[];
  applications: VendorApplication[];
  locale: string;
  openApplication: (applicationId: string) => void;
  openApplicationId: string | null;
  resolveCategoryLabel: ResolveCategoryLabel;
  translate: TranslateViewText;
  values: VendorApplicationDisplayValues;
}

export interface VendorsApplicationsCardsViewProps extends Omit<VendorApplicationDetailsViewProps, 'application'> {
  applications: VendorApplication[];
  locale: string;
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

export interface VendorsApplicationsFilterOption {
  label: string;
  value: string;
}

export interface VendorsApplicationsFilterSelectProps {
  id: string;
  label: string;
  onChange: (value: string) => void;
  options: VendorsApplicationsFilterOption[];
  value: string;
}

export interface VendorsApplicationsToolbarViewProps {
  filters: VendorApplicationsFilters;
  hasActiveFilters: boolean;
  resetFilters: () => void;
  resolveCategoryLabel: ResolveCategoryLabel;
  setFilter: <FilterKey extends keyof VendorApplicationsFilters>(
    filterKey: FilterKey,
    filterValue: VendorApplicationsFilters[FilterKey]
  ) => void;
  standFilterOptions: string[];
  statusCounts: VendorApplicationStatusCounts;
  totalCount: number;
  translate: TranslateViewText;
}
