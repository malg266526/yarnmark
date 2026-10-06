import {
  DEFAULT_WORKSHOP_APPLICATIONS_VIEW_MODE,
  WORKSHOP_APPLICATION_STATUS_ORDER,
  WORKSHOP_APPLICATIONS_SORT_ORDERS,
  WORKSHOP_APPLICATIONS_VIEW_MODES,
  type WorkshopsApplicationsSortOrder,
  type WorkshopsApplicationsViewMode
} from '../workshopsApplicationsConstants.ts';
import {
  DEFAULT_WORKSHOP_APPLICATIONS_FILTERS,
  type WorkshopApplicationsFilters,
  type WorkshopApplicationsLevelFilter,
  type WorkshopApplicationsStatusFilter
} from './workshopApplicationsFilterUtils.ts';

const EXPERIENCE_LEVELS = ['beginner', 'intermediate', 'advanced', 'any'] as const;

export const WORKSHOP_APPLICATIONS_PARAM_KEYS = {
  level: 'level',
  openApplicationId: 'application',
  search: 'q',
  sortOrder: 'sort',
  status: 'status',
  viewMode: 'view'
} as const;

const parseAllowedValue = <AllowedValue extends string, FallbackValue extends string>(
  value: string,
  allowedValues: readonly AllowedValue[],
  fallbackValue: FallbackValue
): AllowedValue | FallbackValue => allowedValues.find((allowedValue) => allowedValue === value) ?? fallbackValue;

const readParam = (searchParams: URLSearchParams, paramKey: string) => searchParams.get(paramKey)?.trim() ?? '';

export const parseWorkshopApplicationsLevelFilter = (value: string): WorkshopApplicationsLevelFilter =>
  parseAllowedValue(value, EXPERIENCE_LEVELS, DEFAULT_WORKSHOP_APPLICATIONS_FILTERS.level);

export const parseWorkshopApplicationsSortOrder = (value: string): WorkshopsApplicationsSortOrder =>
  parseAllowedValue(value, WORKSHOP_APPLICATIONS_SORT_ORDERS, DEFAULT_WORKSHOP_APPLICATIONS_FILTERS.sortOrder);

const parseWorkshopApplicationsStatusFilter = (value: string): WorkshopApplicationsStatusFilter =>
  parseAllowedValue(value, WORKSHOP_APPLICATION_STATUS_ORDER, DEFAULT_WORKSHOP_APPLICATIONS_FILTERS.status);

export const parseWorkshopApplicationsViewMode = (searchParams: URLSearchParams): WorkshopsApplicationsViewMode =>
  parseAllowedValue(
    readParam(searchParams, WORKSHOP_APPLICATIONS_PARAM_KEYS.viewMode),
    WORKSHOP_APPLICATIONS_VIEW_MODES,
    DEFAULT_WORKSHOP_APPLICATIONS_VIEW_MODE
  );

export const parseWorkshopApplicationsFilters = (searchParams: URLSearchParams): WorkshopApplicationsFilters => ({
  level: parseWorkshopApplicationsLevelFilter(readParam(searchParams, WORKSHOP_APPLICATIONS_PARAM_KEYS.level)),
  search: searchParams.get(WORKSHOP_APPLICATIONS_PARAM_KEYS.search) ?? DEFAULT_WORKSHOP_APPLICATIONS_FILTERS.search,
  sortOrder: parseWorkshopApplicationsSortOrder(readParam(searchParams, WORKSHOP_APPLICATIONS_PARAM_KEYS.sortOrder)),
  status: parseWorkshopApplicationsStatusFilter(readParam(searchParams, WORKSHOP_APPLICATIONS_PARAM_KEYS.status))
});

export const parseWorkshopApplicationsOpenId = (searchParams: URLSearchParams): string | null =>
  readParam(searchParams, WORKSHOP_APPLICATIONS_PARAM_KEYS.openApplicationId) || null;

export const buildWorkshopApplicationsSearchParams = (
  filters: WorkshopApplicationsFilters,
  viewMode: WorkshopsApplicationsViewMode,
  openApplicationId: string | null
) => {
  const defaults = DEFAULT_WORKSHOP_APPLICATIONS_FILTERS;
  const candidates: [string, string | null][] = [
    [WORKSHOP_APPLICATIONS_PARAM_KEYS.viewMode, viewMode === DEFAULT_WORKSHOP_APPLICATIONS_VIEW_MODE ? null : viewMode],
    [WORKSHOP_APPLICATIONS_PARAM_KEYS.search, filters.search.trim() ? filters.search : null],
    [WORKSHOP_APPLICATIONS_PARAM_KEYS.status, filters.status === defaults.status ? null : filters.status],
    [WORKSHOP_APPLICATIONS_PARAM_KEYS.level, filters.level === defaults.level ? null : filters.level],
    [WORKSHOP_APPLICATIONS_PARAM_KEYS.sortOrder, filters.sortOrder === defaults.sortOrder ? null : filters.sortOrder],
    [WORKSHOP_APPLICATIONS_PARAM_KEYS.openApplicationId, openApplicationId]
  ];
  const searchParams = new URLSearchParams();

  for (const [key, value] of candidates) {
    if (value !== null) {
      searchParams.set(key, value);
    }
  }

  return searchParams;
};
