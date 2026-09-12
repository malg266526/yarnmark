import type { WorkshopApplicationStatus } from '../../../../domain/workshopApplications/workshopFormSubmission.ts';

export const WORKSHOP_APPLICATION_STATUS_ORDER: WorkshopApplicationStatus[] = [
  'new',
  'considered',
  'accepted',
  'reserve'
];
