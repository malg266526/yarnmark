import type { WorkshopApplicationStatus } from '../../../../domain/workshopApplications/workshopFormSubmission.ts';

export const WORKSHOP_APPLICATION_STATUS_ORDER: WorkshopApplicationStatus[] = ['pending', 'rejected', 'accepted'];

export const WORKSHOP_APPLICATIONS_FILTER_ALL = 'all' as const;
export const WORKSHOP_APPLICATIONS_VIEW_MODES = ['rows', 'cards'] as const;
export const WORKSHOP_APPLICATIONS_SORT_ORDERS = ['oldest', 'newest', 'title', 'tutor'] as const;

export type WorkshopsApplicationsViewMode = (typeof WORKSHOP_APPLICATIONS_VIEW_MODES)[number];
export type WorkshopsApplicationsSortOrder = (typeof WORKSHOP_APPLICATIONS_SORT_ORDERS)[number];

export const DEFAULT_WORKSHOP_APPLICATIONS_VIEW_MODE: WorkshopsApplicationsViewMode = 'rows';
