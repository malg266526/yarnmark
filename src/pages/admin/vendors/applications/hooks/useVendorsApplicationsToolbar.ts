import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { VendorApplication } from '../../../../../domain/vendorApplications/vendorFormSubmission.ts';
import type { ApplicationsViewMode } from '../vendorsApplicationsConstants.ts';
import {
  buildVendorApplicationsSearchParams,
  parseVendorApplicationsFilters,
  parseVendorApplicationsViewMode
} from '../utils/vendorApplicationsFilterParams.ts';
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
  const filters = useMemo(() => parseVendorApplicationsFilters(searchParams), [searchParams]);

  const applyParams = (nextFilters: VendorApplicationsFilters, nextViewMode: ApplicationsViewMode) => {
    setSearchParams(buildVendorApplicationsSearchParams(nextFilters, nextViewMode), { replace: true });
  };

  const setFilter = <FilterKey extends keyof VendorApplicationsFilters>(
    filterKey: FilterKey,
    filterValue: VendorApplicationsFilters[FilterKey]
  ) => {
    applyParams({ ...filters, [filterKey]: filterValue }, viewMode);
  };

  const setViewMode = (nextViewMode: ApplicationsViewMode) => {
    applyParams(filters, nextViewMode);
  };

  const resetFilters = () => {
    applyParams(DEFAULT_VENDOR_APPLICATIONS_FILTERS, viewMode);
  };

  const statusCounts = useMemo(() => countApplicationsByStatus(applications), [applications]);
  const standFilterOptions = useMemo(
    () => resolveStandFilterOptions(applications, filters.standId),
    [applications, filters.standId]
  );
  const visibleApplications = useMemo(
    () => selectVendorApplications(applications, filters, locale),
    [applications, filters, locale]
  );

  return {
    filters,
    hasActiveFilters: hasActiveVendorApplicationsFilters(filters),
    resetFilters,
    setFilter,
    setViewMode,
    standFilterOptions,
    statusCounts,
    viewMode,
    visibleApplications
  };
};
