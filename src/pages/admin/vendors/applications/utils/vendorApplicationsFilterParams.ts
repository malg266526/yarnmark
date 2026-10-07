import {
  DEFAULT_VENDOR_APPLICATIONS_VIEW_MODE,
  VENDOR_APPLICATION_MAIN_CATEGORY_ORDER,
  VENDOR_APPLICATION_STATUS_ORDER,
  VENDOR_APPLICATIONS_SORT_ORDERS,
  VENDOR_APPLICATIONS_VIEW_MODES,
  type ApplicationsViewMode,
  type VendorApplicationsSortOrder
} from '../vendorsApplicationsConstants.ts';
import {
  DEFAULT_VENDOR_APPLICATIONS_FILTERS,
  type VendorApplicationsCategoryFilter,
  type VendorApplicationsFilters,
  type VendorApplicationsStatusFilter
} from './vendorApplicationsFilterUtils.ts';

export const VENDOR_APPLICATIONS_PARAM_KEYS = {
  category: 'category',
  openApplicationId: 'application',
  search: 'q',
  sortOrder: 'sort',
  standId: 'stand',
  status: 'status',
  viewMode: 'view'
} as const;

const parseAllowedValue = <AllowedValue extends string, FallbackValue extends string>(
  value: string,
  allowedValues: readonly AllowedValue[],
  fallbackValue: FallbackValue
): AllowedValue | FallbackValue => allowedValues.find((allowedValue) => allowedValue === value) ?? fallbackValue;

export const parseVendorApplicationsCategoryFilter = (value: string): VendorApplicationsCategoryFilter =>
  parseAllowedValue(value, VENDOR_APPLICATION_MAIN_CATEGORY_ORDER, DEFAULT_VENDOR_APPLICATIONS_FILTERS.category);

const parseVendorApplicationsStatusFilter = (value: string): VendorApplicationsStatusFilter =>
  parseAllowedValue(value, VENDOR_APPLICATION_STATUS_ORDER, DEFAULT_VENDOR_APPLICATIONS_FILTERS.status);

export const parseVendorApplicationsSortOrder = (value: string): VendorApplicationsSortOrder =>
  parseAllowedValue(value, VENDOR_APPLICATIONS_SORT_ORDERS, DEFAULT_VENDOR_APPLICATIONS_FILTERS.sortOrder);

const readParam = (searchParams: URLSearchParams, paramKey: string) => searchParams.get(paramKey)?.trim() ?? '';

export const parseVendorApplicationsViewMode = (searchParams: URLSearchParams): ApplicationsViewMode =>
  parseAllowedValue(
    readParam(searchParams, VENDOR_APPLICATIONS_PARAM_KEYS.viewMode),
    VENDOR_APPLICATIONS_VIEW_MODES,
    DEFAULT_VENDOR_APPLICATIONS_VIEW_MODE
  );

export const parseVendorApplicationsFilters = (searchParams: URLSearchParams): VendorApplicationsFilters => ({
  category: parseVendorApplicationsCategoryFilter(readParam(searchParams, VENDOR_APPLICATIONS_PARAM_KEYS.category)),
  search: searchParams.get(VENDOR_APPLICATIONS_PARAM_KEYS.search) ?? DEFAULT_VENDOR_APPLICATIONS_FILTERS.search,
  sortOrder: parseVendorApplicationsSortOrder(readParam(searchParams, VENDOR_APPLICATIONS_PARAM_KEYS.sortOrder)),
  standId:
    readParam(searchParams, VENDOR_APPLICATIONS_PARAM_KEYS.standId) || DEFAULT_VENDOR_APPLICATIONS_FILTERS.standId,
  status: parseVendorApplicationsStatusFilter(readParam(searchParams, VENDOR_APPLICATIONS_PARAM_KEYS.status))
});

export const parseVendorApplicationsOpenId = (searchParams: URLSearchParams): string | null =>
  readParam(searchParams, VENDOR_APPLICATIONS_PARAM_KEYS.openApplicationId) || null;

export const buildVendorApplicationsSearchParams = (
  filters: VendorApplicationsFilters,
  viewMode: ApplicationsViewMode,
  openApplicationId: string | null
): URLSearchParams => {
  const { category, search, sortOrder, standId, status } = filters;
  const defaults = DEFAULT_VENDOR_APPLICATIONS_FILTERS;
  const paramKeys = VENDOR_APPLICATIONS_PARAM_KEYS;
  const candidateParams: [paramKey: string, value: string | null][] = [
    [paramKeys.viewMode, viewMode === DEFAULT_VENDOR_APPLICATIONS_VIEW_MODE ? null : viewMode],
    [paramKeys.search, search.trim() ? search : null],
    [paramKeys.status, status === defaults.status ? null : status],
    [paramKeys.category, category === defaults.category ? null : category],
    [paramKeys.standId, standId === defaults.standId ? null : standId],
    [paramKeys.sortOrder, sortOrder === defaults.sortOrder ? null : sortOrder],
    [paramKeys.openApplicationId, openApplicationId]
  ];
  const searchParams = new URLSearchParams();

  for (const [paramKey, value] of candidateParams) {
    if (value !== null) {
      searchParams.set(paramKey, value);
    }
  }

  return searchParams;
};
