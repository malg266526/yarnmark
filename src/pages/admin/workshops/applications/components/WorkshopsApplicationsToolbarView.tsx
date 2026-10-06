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
} from '../WorkshopsApplicationsPage.styled';
import {
  WORKSHOP_APPLICATION_STATUS_ORDER,
  WORKSHOP_APPLICATIONS_FILTER_ALL,
  WORKSHOP_APPLICATIONS_SORT_ORDERS
} from '../workshopsApplicationsConstants';
import type { WorkshopApplicationsFilters } from '../utils/workshopApplicationsFilterUtils';
import {
  parseWorkshopApplicationsLevelFilter,
  parseWorkshopApplicationsSortOrder
} from '../utils/workshopApplicationsFilterParams';
import { WorkshopsApplicationsFilterSelect } from './WorkshopsApplicationsFilterSelect';

interface WorkshopsApplicationsToolbarViewProps {
  filters: WorkshopApplicationsFilters;
  hasActiveFilters: boolean;
  resetFilters: () => void;
  setFilter: <FilterKey extends keyof WorkshopApplicationsFilters>(
    key: FilterKey,
    value: WorkshopApplicationsFilters[FilterKey]
  ) => void;
  statusCounts: Record<(typeof WORKSHOP_APPLICATION_STATUS_ORDER)[number], number>;
  totalCount: number;
  translate: (translationKey: string) => string;
}

const EXPERIENCE_LEVELS = ['beginner', 'intermediate', 'advanced', 'any'] as const;

export const WorkshopsApplicationsToolbarView = ({
  filters,
  hasActiveFilters,
  resetFilters,
  setFilter,
  statusCounts,
  totalCount,
  translate
}: WorkshopsApplicationsToolbarViewProps) => (
  <ApplicationsFilters>
    <ApplicationsStatusFilterRow role="group" aria-label={translate('workshopsApplicationsPage.toolbar.statusLabel')}>
      <ApplicationsStatusFilterButton
        type="button"
        aria-pressed={filters.status === WORKSHOP_APPLICATIONS_FILTER_ALL}
        onClick={() => setFilter('status', WORKSHOP_APPLICATIONS_FILTER_ALL)}
      >
        {translate('workshopsApplicationsPage.toolbar.allStatuses')}
        <ApplicationsStatusFilterCount>{totalCount}</ApplicationsStatusFilterCount>
      </ApplicationsStatusFilterButton>
      {WORKSHOP_APPLICATION_STATUS_ORDER.map((status) => (
        <ApplicationsStatusFilterButton
          key={status}
          type="button"
          aria-pressed={filters.status === status}
          onClick={() => setFilter('status', filters.status === status ? WORKSHOP_APPLICATIONS_FILTER_ALL : status)}
        >
          {translate(`workshopsApplicationsPage.statuses.${status}`)}
          <ApplicationsStatusFilterCount>{statusCounts[status]}</ApplicationsStatusFilterCount>
        </ApplicationsStatusFilterButton>
      ))}
    </ApplicationsStatusFilterRow>
    <ApplicationsFilterRow>
      <ApplicationsFilterField>
        <ApplicationsFilterLabel htmlFor="workshop-applications-search">
          {translate('workshopsApplicationsPage.toolbar.searchLabel')}
        </ApplicationsFilterLabel>
        <ApplicationsFilterInput
          id="workshop-applications-search"
          type="search"
          value={filters.search}
          placeholder={translate('workshopsApplicationsPage.toolbar.searchPlaceholder')}
          onChange={(event) => setFilter('search', event.target.value)}
        />
      </ApplicationsFilterField>
      <WorkshopsApplicationsFilterSelect
        id="workshop-applications-level"
        label={translate('workshopsApplicationsPage.toolbar.levelLabel')}
        options={[
          {
            label: translate('workshopsApplicationsPage.toolbar.allLevels'),
            value: WORKSHOP_APPLICATIONS_FILTER_ALL
          },
          ...EXPERIENCE_LEVELS.map((level) => ({
            label: translate(`workshopsFormPage.steps.experienceLevel.${level}`),
            value: level
          }))
        ]}
        value={filters.level}
        onChange={(value) => setFilter('level', parseWorkshopApplicationsLevelFilter(value))}
      />
      <WorkshopsApplicationsFilterSelect
        id="workshop-applications-sort"
        label={translate('workshopsApplicationsPage.toolbar.sortLabel')}
        options={WORKSHOP_APPLICATIONS_SORT_ORDERS.map((sortOrder) => ({
          label: translate(`workshopsApplicationsPage.toolbar.sortOrders.${sortOrder}`),
          value: sortOrder
        }))}
        value={filters.sortOrder}
        onChange={(value) => setFilter('sortOrder', parseWorkshopApplicationsSortOrder(value))}
      />
      <ApplicationsFilterResetButton type="button" disabled={!hasActiveFilters} onClick={resetFilters}>
        {translate('workshopsApplicationsPage.toolbar.reset')}
      </ApplicationsFilterResetButton>
    </ApplicationsFilterRow>
  </ApplicationsFilters>
);
