import type {
  VendorApplication,
  VendorApplicationStatus
} from '../../../../../domain/vendorApplications/vendorFormSubmission.ts';
import type {
  VendorApplicationsFilters,
  VendorApplicationStatusCounts
} from '../utils/vendorApplicationsFilterUtils.ts';
import type { VendorApplicationFlag } from '../utils/vendorApplicationFlagsUtils.ts';
import type { CascadeEligibilitySummary } from '../utils/standAllocationUtils.ts';
import type { CascadeExportLabels } from '../utils/cascadeExportUtils';

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

export interface VendorApplicationFlagsViewProps {
  emptyLabel: string;
  flags: VendorApplicationFlag[];
  translate: TranslateViewText;
}

export interface VendorApplicationStandAssignment {
  allApplications: VendorApplication[];
  assignStands: (applicationId: string, standIds: string[]) => Promise<void>;
  savingStandApplicationId: string | null;
  vendorStandIds: string[];
}

export interface VendorApplicationStandAssignmentViewProps {
  application: VendorApplication;
  standAssignment: VendorApplicationStandAssignment;
  translate: TranslateViewText;
}

export interface VendorApplicationDetailsViewProps {
  application: VendorApplication;
  flags: VendorApplicationFlag[];
  isSavingStatus: boolean;
  deleteApplication: (applicationId: string) => Promise<void>;
  deletingApplicationId: string | null;
  resolveCategoryLabel: ResolveCategoryLabel;
  setApplicationStatus: (applicationId: string, status: VendorApplicationStatus) => Promise<void>;
  standAssignment: VendorApplicationStandAssignment;
  translate: TranslateViewText;
  values: VendorApplicationDisplayValues;
}

export interface VendorApplicationDetailsDrawerProps
  extends Omit<VendorApplicationDetailsViewProps, 'application' | 'isSavingStatus'> {
  application: VendorApplication | null;
  closeApplication: () => void;
  locale: string;
  savingStatusApplicationId: string | null;
}

export interface VendorsApplicationsUndoToastProps {
  actionLabel: string;
  dismissLabel: string;
  message: string;
  onAction: () => void;
  onDismiss: () => void;
}

export interface VendorsApplicationsRowsViewProps {
  allApplications: VendorApplication[];
  applications: VendorApplication[];
  flagsByApplicationId: VendorApplicationFlagsByApplicationId;
  highlightApplication?: (applicationId: string | null) => void;
  locale: string;
  openApplication: (applicationId: string) => void;
  openApplicationId: string | null;
  resolveCategoryLabel: ResolveCategoryLabel;
  translate: TranslateViewText;
  values: VendorApplicationDisplayValues;
}

export type VendorApplicationFlagsByApplicationId = ReadonlyMap<string, VendorApplicationFlag[]>;

export interface VendorsApplicationsCardsViewProps
  extends Omit<VendorApplicationDetailsViewProps, 'application' | 'flags' | 'isSavingStatus'> {
  applications: VendorApplication[];
  flagsByApplicationId: VendorApplicationFlagsByApplicationId;
  locale: string;
  savingStatusApplicationId: string | null;
}

export interface VendorsApplicationsCascadeViewProps {
  simulationLabel: string;
  simulationDescription: string;
  exportLabel: string;
  emptyLabel: string;
  resolveEmptyExplanation: (summary: CascadeEligibilitySummary) => string;
  exportLabels: CascadeExportLabels;
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

export type StandPriorityHighlights = ReadonlyMap<string, number>;

export interface VendorsApplicationsMapViewProps {
  applications: VendorApplication[];
  highlightedStands?: StandPriorityHighlights;
  multiplier: number;
  selectStand: (standId: string) => void;
  selectedStandId: string;
  translate: TranslateViewText;
}

export interface VendorsApplicationsStandRequestsViewProps {
  applications: VendorApplication[];
  locale: string;
  resolvePriorityLabel: (priority: 'highest' | 'medium' | 'lowest') => string;
  selectedStandId: string;
  translate: TranslateViewText;
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
  exportUrl: string | undefined;
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

export interface VendorsApplicationsSplitViewProps
  extends Omit<VendorsApplicationsRowsViewProps, 'highlightApplication'> {
  mapMultiplier: number;
  selectStand: (standId: string) => void;
  selectedStandId: string;
}
