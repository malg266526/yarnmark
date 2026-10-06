import type {
  VendorApplication,
  VendorApplicationStatus
} from '../../../../../domain/vendorApplications/vendorFormSubmission.ts';
import type {
  VendorApplicationsFilters,
  VendorApplicationStatusCounts
} from '../utils/vendorApplicationsFilterUtils.ts';

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
  resolveCategoryLabel: (categoryKey: NonNullable<VendorApplication['mainCategory']>) => string;
  setFilter: <FilterKey extends keyof VendorApplicationsFilters>(
    filterKey: FilterKey,
    filterValue: VendorApplicationsFilters[FilterKey]
  ) => void;
  standFilterOptions: string[];
  statusCounts: VendorApplicationStatusCounts;
  totalCount: number;
  translate: (translationKey: string, options?: Record<string, unknown>) => string;
}
