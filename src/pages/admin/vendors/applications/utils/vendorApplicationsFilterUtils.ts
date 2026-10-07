import type {
  VendorApplication,
  VendorApplicationStatus
} from '../../../../../domain/vendorApplications/vendorFormSubmission.ts';
import type { VendorFormMainCategory } from '../../../../../domain/vendorApplications/vendorFormTypes.ts';
import { VENDOR_APPLICATIONS_FILTER_ALL, type VendorApplicationsSortOrder } from '../vendorsApplicationsConstants.ts';
import { compareApplicationsBySubmittedAt } from './standAllocationUtils.ts';
import { getStandInterestCounts } from '../../../../../domain/vendorApplications/vendorFormStandInterestUtils.ts';

type VendorApplicationsFilterAll = typeof VENDOR_APPLICATIONS_FILTER_ALL;

export type VendorApplicationsCategoryFilter = NonNullable<VendorFormMainCategory> | VendorApplicationsFilterAll;

export type VendorApplicationsStatusFilter = VendorApplicationStatus | VendorApplicationsFilterAll;

export type VendorApplicationsStandFilter = string | VendorApplicationsFilterAll;

export interface VendorApplicationsFilters {
  category: VendorApplicationsCategoryFilter;
  search: string;
  sortOrder: VendorApplicationsSortOrder;
  standId: VendorApplicationsStandFilter;
  status: VendorApplicationsStatusFilter;
}

export const DEFAULT_VENDOR_APPLICATIONS_FILTERS: VendorApplicationsFilters = {
  category: VENDOR_APPLICATIONS_FILTER_ALL,
  search: '',
  sortOrder: 'oldest',
  standId: VENDOR_APPLICATIONS_FILTER_ALL,
  status: VENDOR_APPLICATIONS_FILTER_ALL
};

const VENDOR_APPLICATIONS_FILTER_KEYS: (keyof VendorApplicationsFilters)[] = [
  'category',
  'search',
  'sortOrder',
  'standId',
  'status'
];

export type VendorApplicationStatusCounts = Readonly<Record<VendorApplicationStatus, number>>;

const EMPTY_STATUS_COUNTS: VendorApplicationStatusCounts = {
  accepted: 0,
  pending: 0,
  rejected: 0,
  'reserve-list': 0,
  'stand-assigned': 0
};

export const countApplicationsByStatus = (applications: VendorApplication[]): VendorApplicationStatusCounts =>
  applications.reduce<VendorApplicationStatusCounts>(
    (statusCounts, { status }) => ({ ...statusCounts, [status]: statusCounts[status] + 1 }),
    EMPTY_STATUS_COUNTS
  );

export type FirstChoiceCompetitorCounts = ReadonlyMap<string, number>;

export const countFirstChoiceCompetitors = (applications: VendorApplication[]): FirstChoiceCompetitorCounts => {
  const requestCounts = getStandInterestCounts(applications);

  return new Map(
    applications.map(({ id, preferredStands }) => {
      const [firstChoiceStandId] = preferredStands;

      if (!firstChoiceStandId) {
        return [id, 0];
      }

      return [id, (requestCounts.get(firstChoiceStandId) ?? 1) - 1];
    })
  );
};

const compareStandIds = (leftStandId: string, rightStandId: string) =>
  leftStandId.localeCompare(rightStandId, undefined, { numeric: true });

export const collectPreferredStandIds = (applications: VendorApplication[]): string[] =>
  [...new Set(applications.flatMap(({ preferredStands }) => preferredStands))].sort(compareStandIds);

export const resolveStandFilterOptions = (
  applications: VendorApplication[],
  standId: VendorApplicationsStandFilter
): string[] => {
  const preferredStandIds = collectPreferredStandIds(applications);

  if (standId === VENDOR_APPLICATIONS_FILTER_ALL || preferredStandIds.includes(standId)) {
    return preferredStandIds;
  }

  return [standId, ...preferredStandIds];
};

const normalizeSearchTerm = (value: string) => value.trim().toLowerCase();

const keepDigitsOnly = (value: string) => value.replace(/\D/g, '');

export const matchesVendorApplicationSearch = (application: VendorApplication, search: string): boolean => {
  const normalizedSearch = normalizeSearchTerm(search);

  if (!normalizedSearch) {
    return true;
  }

  const matchesText = [application.storeName, application.email].some((value) =>
    normalizeSearchTerm(value).includes(normalizedSearch)
  );

  if (matchesText) {
    return true;
  }

  const searchedDigits = keepDigitsOnly(normalizedSearch);

  return searchedDigits.length > 0 && keepDigitsOnly(application.phoneNumber).includes(searchedDigits);
};

const matchesStatus = (application: VendorApplication, status: VendorApplicationsStatusFilter) =>
  status === VENDOR_APPLICATIONS_FILTER_ALL || application.status === status;

const matchesCategory = (application: VendorApplication, category: VendorApplicationsCategoryFilter) =>
  category === VENDOR_APPLICATIONS_FILTER_ALL || application.mainCategory === category;

const matchesPreferredStand = (application: VendorApplication, standId: VendorApplicationsStandFilter) =>
  standId === VENDOR_APPLICATIONS_FILTER_ALL || application.preferredStands.includes(standId);

export const filterVendorApplications = (
  applications: VendorApplication[],
  filters: VendorApplicationsFilters
): VendorApplication[] =>
  applications.filter(
    (application) =>
      matchesStatus(application, filters.status) &&
      matchesCategory(application, filters.category) &&
      matchesPreferredStand(application, filters.standId) &&
      matchesVendorApplicationSearch(application, filters.search)
  );

export interface VendorApplicationsSortContext {
  firstChoiceCompetitors: FirstChoiceCompetitorCounts;
  locale: string;
}

type VendorApplicationComparator = (leftApplication: VendorApplication, rightApplication: VendorApplication) => number;

const createVendorApplicationComparators = ({
  firstChoiceCompetitors,
  locale
}: VendorApplicationsSortContext): Record<VendorApplicationsSortOrder, VendorApplicationComparator> => ({
  oldest: compareApplicationsBySubmittedAt,
  newest: (leftApplication, rightApplication) => compareApplicationsBySubmittedAt(rightApplication, leftApplication),
  name: (leftApplication, rightApplication) =>
    leftApplication.storeName.localeCompare(rightApplication.storeName, locale, { numeric: true }) ||
    compareApplicationsBySubmittedAt(leftApplication, rightApplication),
  demand: (leftApplication, rightApplication) =>
    (firstChoiceCompetitors.get(rightApplication.id) ?? 0) - (firstChoiceCompetitors.get(leftApplication.id) ?? 0) ||
    compareApplicationsBySubmittedAt(leftApplication, rightApplication)
});

export const sortVendorApplications = (
  applications: VendorApplication[],
  sortOrder: VendorApplicationsSortOrder,
  sortContext: VendorApplicationsSortContext
): VendorApplication[] => [...applications].sort(createVendorApplicationComparators(sortContext)[sortOrder]);

export const selectVendorApplications = (
  applications: VendorApplication[],
  filters: VendorApplicationsFilters,
  locale: string
): VendorApplication[] =>
  sortVendorApplications(filterVendorApplications(applications, filters), filters.sortOrder, {
    firstChoiceCompetitors: countFirstChoiceCompetitors(applications),
    locale
  });

export const hasActiveVendorApplicationsFilters = (filters: VendorApplicationsFilters): boolean =>
  VENDOR_APPLICATIONS_FILTER_KEYS.some(
    (filterKey) => filters[filterKey].trim() !== DEFAULT_VENDOR_APPLICATIONS_FILTERS[filterKey]
  );
