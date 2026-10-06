import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { VendorApplication } from '../../../../../domain/vendorApplications/vendorFormSubmission.ts';
import type { ApplicationsViewMode } from '../vendorsApplicationsConstants.ts';
import {
  buildVendorApplicationsSearchParams,
  parseVendorApplicationsFilters,
  parseVendorApplicationsOpenId,
  parseVendorApplicationsViewMode
} from '../utils/vendorApplicationsFilterParams.ts';
import { buildVendorApplicationFlags } from '../utils/vendorApplicationFlagsUtils.ts';
import {
  countApplicationsByStatus,
  DEFAULT_VENDOR_APPLICATIONS_FILTERS,
  hasActiveVendorApplicationsFilters,
  resolveStandFilterOptions,
  selectVendorApplications,
  type VendorApplicationsFilters
} from '../utils/vendorApplicationsFilterUtils.ts';

export const useVendorsApplicationsToolbar = (applications: VendorApplication[], locale: string) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const viewMode = parseVendorApplicationsViewMode(searchParams);
  const openApplicationId = parseVendorApplicationsOpenId(searchParams);
  const filters = useMemo(() => parseVendorApplicationsFilters(searchParams), [searchParams]);

  const applyParams = (
    nextFilters: VendorApplicationsFilters,
    nextViewMode: ApplicationsViewMode,
    nextOpenApplicationId: string | null
  ) => {
    setSearchParams(buildVendorApplicationsSearchParams(nextFilters, nextViewMode, nextOpenApplicationId), {
      replace: true
    });
  };

  const setFilter = <FilterKey extends keyof VendorApplicationsFilters>(
    filterKey: FilterKey,
    filterValue: VendorApplicationsFilters[FilterKey]
  ) => {
    applyParams({ ...filters, [filterKey]: filterValue }, viewMode, openApplicationId);
  };

  const setViewMode = (nextViewMode: ApplicationsViewMode) => {
    applyParams(filters, nextViewMode, openApplicationId);
  };

  const resetFilters = () => {
    applyParams(DEFAULT_VENDOR_APPLICATIONS_FILTERS, viewMode, openApplicationId);
  };

  const openApplication = (applicationId: string) => {
    applyParams(filters, viewMode, applicationId);
  };

  const closeApplication = () => {
    applyParams(filters, viewMode, null);
  };

  const statusCounts = useMemo(() => countApplicationsByStatus(applications), [applications]);
  const flagsByApplicationId = useMemo(() => buildVendorApplicationFlags(applications), [applications]);
  const standFilterOptions = useMemo(
    () => resolveStandFilterOptions(applications, filters.standId),
    [applications, filters.standId]
  );
  const visibleApplications = useMemo(
    () => selectVendorApplications(applications, filters, locale),
    [applications, filters, locale]
  );

  const openApplicationRecord = applications.find(({ id }) => id === openApplicationId) ?? null;

  return {
    closeApplication,
    filters,
    flagsByApplicationId,
    hasActiveFilters: hasActiveVendorApplicationsFilters(filters),
    openApplication,
    openApplicationRecord,
    resetFilters,
    setFilter,
    setViewMode,
    standFilterOptions,
    statusCounts,
    viewMode,
    visibleApplications
  };
};
