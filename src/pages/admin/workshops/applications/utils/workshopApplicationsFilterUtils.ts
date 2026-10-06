import type {
  WorkshopApplication,
  WorkshopApplicationStatus
} from '../../../../../domain/workshopApplications/workshopFormSubmission.ts';
import type { WorkshopFormExperienceLevel } from '../../../../../domain/workshopApplications/workshopFormTypes.ts';
import {
  WORKSHOP_APPLICATIONS_FILTER_ALL,
  type WorkshopsApplicationsSortOrder
} from '../workshopsApplicationsConstants.ts';

export type WorkshopApplicationsStatusFilter = WorkshopApplicationStatus | typeof WORKSHOP_APPLICATIONS_FILTER_ALL;
export type WorkshopApplicationsLevelFilter =
  | Exclude<WorkshopFormExperienceLevel, null>
  | typeof WORKSHOP_APPLICATIONS_FILTER_ALL;

export interface WorkshopApplicationsFilters {
  level: WorkshopApplicationsLevelFilter;
  search: string;
  sortOrder: WorkshopsApplicationsSortOrder;
  status: WorkshopApplicationsStatusFilter;
}

export const DEFAULT_WORKSHOP_APPLICATIONS_FILTERS: WorkshopApplicationsFilters = {
  level: WORKSHOP_APPLICATIONS_FILTER_ALL,
  search: '',
  sortOrder: 'oldest',
  status: WORKSHOP_APPLICATIONS_FILTER_ALL
};

const normalizeSearchValue = (value: string) => value.trim().toLocaleLowerCase();

export const countWorkshopApplicationsByStatus = (
  applications: WorkshopApplication[]
): Record<WorkshopApplicationStatus, number> => ({
  accepted: applications.filter(({ status }) => status === 'accepted').length,
  pending: applications.filter(({ status }) => status === 'pending').length,
  rejected: applications.filter(({ status }) => status === 'rejected').length
});

export const hasActiveWorkshopApplicationsFilters = (filters: WorkshopApplicationsFilters) =>
  filters.level !== DEFAULT_WORKSHOP_APPLICATIONS_FILTERS.level ||
  filters.search.trim() !== DEFAULT_WORKSHOP_APPLICATIONS_FILTERS.search ||
  filters.sortOrder !== DEFAULT_WORKSHOP_APPLICATIONS_FILTERS.sortOrder ||
  filters.status !== DEFAULT_WORKSHOP_APPLICATIONS_FILTERS.status;

export const selectWorkshopApplications = (
  applications: WorkshopApplication[],
  filters: WorkshopApplicationsFilters,
  locale: string
) => {
  const search = normalizeSearchValue(filters.search);
  const selectedApplications = applications.filter((application) => {
    const matchesSearch =
      !search ||
      [application.workshopTitle, application.tutorName, application.email, application.phoneNumber].some((value) =>
        normalizeSearchValue(value).includes(search)
      );
    const matchesStatus = filters.status === WORKSHOP_APPLICATIONS_FILTER_ALL || application.status === filters.status;
    const matchesLevel =
      filters.level === WORKSHOP_APPLICATIONS_FILTER_ALL || application.experienceLevel === filters.level;

    return matchesSearch && matchesStatus && matchesLevel;
  });

  return selectedApplications.sort((left, right) => {
    switch (filters.sortOrder) {
      case 'newest':
        return right.submittedAt.localeCompare(left.submittedAt);
      case 'title':
        return left.workshopTitle.localeCompare(right.workshopTitle, locale);
      case 'tutor':
        return left.tutorName.localeCompare(right.tutorName, locale);
      case 'oldest':
        return left.submittedAt.localeCompare(right.submittedAt);
    }
  });
};
