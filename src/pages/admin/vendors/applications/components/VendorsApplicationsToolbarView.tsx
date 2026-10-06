import React from 'react';
import {
  ApplicationsFilterField,
  ApplicationsFilterInput,
  ApplicationsFilterLabel,
  ApplicationsFilterResetButton,
  ApplicationsFilterRow,
  ApplicationsFilters,
  ApplicationsStatusFilterButton,
  ApplicationsStatusFilterCount,
  ApplicationsStatusFilterRow
} from '../VendorsApplicationsPage.styled';
import {
  VENDOR_APPLICATION_MAIN_CATEGORY_ORDER,
  VENDOR_APPLICATION_STATUS_ORDER,
  VENDOR_APPLICATIONS_FILTER_ALL,
  VENDOR_APPLICATIONS_SORT_ORDERS
} from '../vendorsApplicationsConstants';
import {
  parseVendorApplicationsCategoryFilter,
  parseVendorApplicationsSortOrder
} from '../utils/vendorApplicationsFilterParams';
import { VendorsApplicationsFilterSelect } from './VendorsApplicationsFilterSelect';
import { VendorsApplicationsToolbarViewProps } from './vendorsApplicationsViewContracts';

const FILTER_FIELD_IDS = {
  category: 'vendor-applications-category',
  search: 'vendor-applications-search',
  sortOrder: 'vendor-applications-sort',
  standId: 'vendor-applications-stand'
} as const;

export const VendorsApplicationsToolbarView = ({
  filters,
  hasActiveFilters,
  resetFilters,
  resolveCategoryLabel,
  setFilter,
  standFilterOptions,
  statusCounts,
  totalCount,
  translate
}: VendorsApplicationsToolbarViewProps) => {
  const categoryOptions = [
    { label: translate('vendorsApplicationsPage.toolbar.allCategories'), value: VENDOR_APPLICATIONS_FILTER_ALL },
    ...VENDOR_APPLICATION_MAIN_CATEGORY_ORDER.map((category) => ({
      label: resolveCategoryLabel(category),
      value: category
    }))
  ];
  const standOptions = [
    { label: translate('vendorsApplicationsPage.toolbar.allStands'), value: VENDOR_APPLICATIONS_FILTER_ALL },
    ...standFilterOptions.map((standId) => ({ label: standId, value: standId }))
  ];
  const sortOptions = VENDOR_APPLICATIONS_SORT_ORDERS.map((sortOrder) => ({
    label: translate(`vendorsApplicationsPage.toolbar.sortOrders.${sortOrder}`),
    value: sortOrder
  }));

  return (
    <ApplicationsFilters>
      <ApplicationsStatusFilterRow role="group" aria-label={translate('vendorsApplicationsPage.toolbar.statusLabel')}>
        <ApplicationsStatusFilterButton
          type="button"
          aria-pressed={filters.status === VENDOR_APPLICATIONS_FILTER_ALL}
          onClick={() => setFilter('status', VENDOR_APPLICATIONS_FILTER_ALL)}
        >
          {translate('vendorsApplicationsPage.toolbar.allStatuses')}
          <ApplicationsStatusFilterCount>{totalCount}</ApplicationsStatusFilterCount>
        </ApplicationsStatusFilterButton>
        {VENDOR_APPLICATION_STATUS_ORDER.map((status) => (
          <ApplicationsStatusFilterButton
            key={status}
            type="button"
            aria-pressed={filters.status === status}
            onClick={() => setFilter('status', filters.status === status ? VENDOR_APPLICATIONS_FILTER_ALL : status)}
          >
            {translate(`vendorsApplicationsPage.statuses.${status}`)}
            <ApplicationsStatusFilterCount>{statusCounts[status]}</ApplicationsStatusFilterCount>
          </ApplicationsStatusFilterButton>
        ))}
      </ApplicationsStatusFilterRow>

      <ApplicationsFilterRow>
        <ApplicationsFilterField>
          <ApplicationsFilterLabel htmlFor={FILTER_FIELD_IDS.search}>
            {translate('vendorsApplicationsPage.toolbar.searchLabel')}
          </ApplicationsFilterLabel>
          <ApplicationsFilterInput
            id={FILTER_FIELD_IDS.search}
            type="search"
            value={filters.search}
            placeholder={translate('vendorsApplicationsPage.toolbar.searchPlaceholder')}
            onChange={(event) => setFilter('search', event.target.value)}
          />
        </ApplicationsFilterField>

        <VendorsApplicationsFilterSelect
          id={FILTER_FIELD_IDS.category}
          label={translate('vendorsApplicationsPage.toolbar.categoryLabel')}
          options={categoryOptions}
          value={filters.category}
          onChange={(value) => setFilter('category', parseVendorApplicationsCategoryFilter(value))}
        />

        <VendorsApplicationsFilterSelect
          id={FILTER_FIELD_IDS.standId}
          label={translate('vendorsApplicationsPage.toolbar.standLabel')}
          options={standOptions}
          value={filters.standId}
          onChange={(value) => setFilter('standId', value)}
        />

        <VendorsApplicationsFilterSelect
          id={FILTER_FIELD_IDS.sortOrder}
          label={translate('vendorsApplicationsPage.toolbar.sortLabel')}
          options={sortOptions}
          value={filters.sortOrder}
          onChange={(value) => setFilter('sortOrder', parseVendorApplicationsSortOrder(value))}
        />

        <ApplicationsFilterResetButton type="button" disabled={!hasActiveFilters} onClick={resetFilters}>
          {translate('vendorsApplicationsPage.toolbar.reset')}
        </ApplicationsFilterResetButton>
      </ApplicationsFilterRow>
    </ApplicationsFilters>
  );
};
