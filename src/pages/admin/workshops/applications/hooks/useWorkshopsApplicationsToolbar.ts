import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { WorkshopApplication } from '../../../../../domain/workshopApplications/workshopFormSubmission.ts';
import type { WorkshopsApplicationsViewMode } from '../workshopsApplicationsConstants.ts';
import {
  buildWorkshopApplicationsSearchParams,
  parseWorkshopApplicationsFilters,
  parseWorkshopApplicationsOpenId,
  parseWorkshopApplicationsViewMode
} from '../utils/workshopApplicationsFilterParams.ts';
import {
  countWorkshopApplicationsByStatus,
  DEFAULT_WORKSHOP_APPLICATIONS_FILTERS,
  hasActiveWorkshopApplicationsFilters,
  selectWorkshopApplications,
  type WorkshopApplicationsFilters
} from '../utils/workshopApplicationsFilterUtils.ts';
import { buildWorkshopApplicationWarnings } from '../utils/workshopScheduleUtils.ts';

export const useWorkshopsApplicationsToolbar = (applications: WorkshopApplication[], locale: string) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = useMemo(() => parseWorkshopApplicationsFilters(searchParams), [searchParams]);
  const viewMode = parseWorkshopApplicationsViewMode(searchParams);
  const openApplicationId = parseWorkshopApplicationsOpenId(searchParams);

  const applyParams = (
    nextFilters: WorkshopApplicationsFilters,
    nextViewMode: WorkshopsApplicationsViewMode,
    nextOpenApplicationId: string | null
  ) => {
    setSearchParams(buildWorkshopApplicationsSearchParams(nextFilters, nextViewMode, nextOpenApplicationId), {
      replace: true
    });
  };

  const setFilter = <FilterKey extends keyof WorkshopApplicationsFilters>(
    key: FilterKey,
    value: WorkshopApplicationsFilters[FilterKey]
  ) => applyParams({ ...filters, [key]: value }, viewMode, openApplicationId);

  return {
    closeApplication: () => applyParams(filters, viewMode, null),
    filters,
    hasActiveFilters: hasActiveWorkshopApplicationsFilters(filters),
    openApplication: (applicationId: string) => applyParams(filters, viewMode, applicationId),
    openApplicationRecord: applications.find(({ id }) => id === openApplicationId) ?? null,
    resetFilters: () => applyParams(DEFAULT_WORKSHOP_APPLICATIONS_FILTERS, viewMode, openApplicationId),
    setFilter,
    setViewMode: (nextViewMode: WorkshopsApplicationsViewMode) => applyParams(filters, nextViewMode, openApplicationId),
    statusCounts: useMemo(() => countWorkshopApplicationsByStatus(applications), [applications]),
    viewMode,
    visibleApplications: useMemo(
      () => selectWorkshopApplications(applications, filters, locale),
      [applications, filters, locale]
    ),
    warningsByApplicationId: useMemo(() => buildWorkshopApplicationWarnings(applications), [applications])
  };
};
